from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
from werkzeug.utils import secure_filename
import PyPDF2
import json
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='.', template_folder='.')
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size
app.config['UPLOAD_FOLDER'] = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

# Create uploads folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# LLM API Configuration
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
LLM_MODEL = os.getenv('LLM_MODEL', 'gpt-4')
LLM_API_BASE = os.getenv('LLM_API_BASE')  # For custom LLM endpoints

# Initialize OpenAI client
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY
    if LLM_API_BASE:
        openai.api_base = LLM_API_BASE

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(file_path):
    """Extract text from PDF file"""
    try:
        with open(file_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ''
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
    except Exception as e:
        raise Exception(f"Error extracting PDF text: {str(e)}")

def extract_text_from_txt(file_path):
    """Extract text from TXT file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        raise Exception(f"Error reading text file: {str(e)}")

def analyze_emotions_with_llm(text):
    """
    Analyze emotions in French text using LLM
    Specialized for Algerian post-colonial literature
    """
    try:
        prompt = f"""Tu es un expert en analyse émotionnelle de la littérature française et maghrébine, spécialisé dans la littérature post-coloniale algérienne.

Analyse le texte suivant et identifie les émotions présentes. Pour chaque émotion détectée, fournis:
1. Le type d'émotion (joie, tristesse, colère, peur, surprise, dégoût, nostalgie, espoir, etc.)
2. L'intensité (faible, moyenne, forte) sur une échelle de 0 à 100
3. Les passages du texte qui expriment cette émotion
4. Le contexte culturel et post-colonial si pertinent

Texte à analyser:
{text[:4000]}  # Limit text length for API

Réponds au format JSON avec la structure suivante:
{{
    "emotions": [
        {{
            "type": "nom de l'émotion",
            "intensity": score de 0 à 100,
            "percentage": pourcentage,
            "passages": ["extrait1", "extrait2"],
            "context": "contexte culturel"
        }}
    ],
    "dominant_emotion": "émotion principale",
    "emotional_tone": "ton général (positif/négatif/neutre/mixte)",
    "cultural_notes": "notes sur le contexte post-colonial algérien",
    "summary": "résumé de l'analyse émotionnelle"
}}"""

        response = openai.ChatCompletion.create(
            model=LLM_MODEL,
            messages=[
                {"role": "system", "content": "Tu es un expert en analyse émotionnelle de la littérature francophone et maghrébine."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )

        result = response.choices[0].message.content
        
        # Try to parse JSON response
        try:
            return json.loads(result)
        except json.JSONDecodeError:
            # If not valid JSON, return structured response
            return {
                "emotions": [
                    {"type": "Analyse en cours", "intensity": 50, "percentage": 100, "passages": [], "context": ""}
                ],
                "dominant_emotion": "En cours d'analyse",
                "emotional_tone": "mixte",
                "cultural_notes": result,
                "summary": "Analyse complétée"
            }

    except Exception as e:
        raise Exception(f"Error analyzing emotions: {str(e)}")

@app.route('/')
def index():
    """Serve the main page"""
    return render_template('index.html')

@app.route('/pricing')
def pricing():
    """Serve the pricing page"""
    return render_template('pricing.html')

@app.route('/faq')
def faq():
    """Serve the FAQ page"""
    return render_template('faq.html')

@app.route('/api/analyze', methods=['POST'])
def analyze_text():
    """
    API endpoint to analyze text emotions
    Accepts both direct text and file uploads
    """
    try:
        text = None
        
        # Check if text is provided directly
        if request.json and 'text' in request.json:
            text = request.json['text']
        
        # Check if file is uploaded
        elif 'file' in request.files:
            file = request.files['file']
            
            if file.filename == '':
                return jsonify({'error': 'No file selected'}), 400
            
            if not allowed_file(file.filename):
                return jsonify({'error': 'File type not allowed. Only .txt and .pdf files are supported'}), 400
            
            # Save file
            filename = secure_filename(file.filename)
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{filename}"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            # Extract text based on file type
            if filename.endswith('.pdf'):
                text = extract_text_from_pdf(file_path)
            else:
                text = extract_text_from_txt(file_path)
            
            # Clean up file after extraction
            try:
                os.remove(file_path)
            except:
                pass
        
        if not text or len(text.strip()) == 0:
            return jsonify({'error': 'No text provided for analysis'}), 400
        
        # Check if API key is configured
        if not OPENAI_API_KEY:
            return jsonify({
                'error': 'LLM API not configured',
                'message': 'Please set OPENAI_API_KEY in your .env file'
            }), 503
        
        # Analyze emotions
        analysis_result = analyze_emotions_with_llm(text)
        
        # Add metadata
        response = {
            'success': True,
            'text_length': len(text),
            'analyzed_at': datetime.now().isoformat(),
            'analysis': analysis_result
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'api_configured': bool(OPENAI_API_KEY),
        'model': LLM_MODEL,
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/config', methods=['GET'])
def get_config():
    """Get public configuration"""
    return jsonify({
        'max_file_size_mb': 100,
        'allowed_extensions': list(ALLOWED_EXTENSIONS),
        'api_available': bool(OPENAI_API_KEY)
    }), 200

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 EmoLetr Server Starting...")
    print("=" * 60)
    print(f"📍 Server: http://localhost:5000")
    print(f"🏠 Home: http://localhost:5000/")
    print(f"💰 Pricing: http://localhost:5000/pricing")
    print(f"❓ FAQ: http://localhost:5000/faq")
    print(f"🔧 API Health: http://localhost:5000/api/health")
    print("=" * 60)
    
    if not OPENAI_API_KEY:
        print("⚠️  WARNING: OPENAI_API_KEY not set in .env file")
        print("   LLM analysis will not work until configured")
        print("=" * 60)
    else:
        print(f"✅ LLM API configured (Model: {LLM_MODEL})")
        print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
