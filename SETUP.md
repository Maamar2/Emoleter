# EmoLetr - Setup Guide

Complete setup instructions for running the EmoLetr platform with Python backend and LLM integration.

## Prerequisites

- **Python 3.8+** installed on your system
- **pip** (Python package manager)
- **LLM API Key** (OpenAI, or other compatible LLM provider)

## Quick Start

### 1. Install Python Dependencies

Open a terminal/command prompt in the project folder and run:

```bash
pip install -r requirements.txt
```

This will install:
- Flask (Web server)
- flask-cors (CORS support)
- python-dotenv (Environment variables)
- openai (LLM API client)
- PyPDF2 (PDF processing)
- Werkzeug (File handling)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

2. Edit the `.env` file and add your API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   LLM_MODEL=gpt-4
   ```

   **Where to get API keys:**
   - **OpenAI**: https://platform.openai.com/api-keys
   - **Anthropic Claude**: https://console.anthropic.com/
   - **Hugging Face**: https://huggingface.co/settings/tokens

### 3. Start the Server

Run the Flask server:

```bash
python app.py
```

You should see:
```
EmoLetr Server Starting...
Server: http://localhost:5000
Home: http://localhost:5000/
Pricing: http://localhost:5000/pricing
FAQ: http://localhost:5000/faq
API Health: http://localhost:5000/api/health
LLM API configured (Model: gpt-4)
```

### 4. Open the Website

Open your browser and navigate to:
```
http://localhost:5000
```

## Configuration Options

### Using Different LLM Models

Edit your `.env` file:

**OpenAI Models:**
```env
LLM_MODEL=gpt-4              # Most capable
LLM_MODEL=gpt-4-turbo-preview # Faster, cheaper
LLM_MODEL=gpt-3.5-turbo      # Fastest, cheapest
```

**Custom LLM Endpoint (Azure OpenAI, Local LLM):**
```env
OPENAI_API_KEY=your-key
LLM_API_BASE=https://your-custom-endpoint.com/v1
LLM_MODEL=your-model-name
```

**Local LLM (Ollama, LM Studio):**
```env
LLM_API_BASE=http://localhost:11434/v1
LLM_MODEL=llama2
OPENAI_API_KEY=dummy-key  # Some local LLMs need this
```

## Project Structure

```
Emoleter/
├── app.py              # Flask backend server
├── index.html          # Main page
├── pricing.html        # Pricing page
├── faq.html           # FAQ page
├── styles.css         # All styles
├── script.js          # Frontend JavaScript
├── requirements.txt   # Python dependencies
├── .env              # Your API keys (DO NOT COMMIT)
├── .env.example      # Example environment file
├── .gitignore        # Git ignore rules
├── uploads/          # Temporary file uploads (auto-created)
├── README.md         # Project documentation
└── SETUP.md          # This file
```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and configuration.

### Analyze Text
```
POST /api/analyze
Content-Type: application/json

{
  "text": "Votre texte français ici..."
}
```

### Analyze File
```
POST /api/analyze
Content-Type: multipart/form-data

file: [.txt or .pdf file]
```

### Get Configuration
```
GET /api/config
```
Returns public configuration (max file size, allowed extensions).

## Testing the API

### Using curl:

**Test health:**
```bash
curl http://localhost:5000/api/health
```

**Analyze text:**
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Je suis très heureux aujourd'hui!\"}"
```

**Analyze file:**
```bash
curl -X POST http://localhost:5000/api/analyze \
  -F "file=@your-file.txt"
```

## Troubleshooting

### Server won't start

**Error: "No module named 'flask'"**
```bash
pip install -r requirements.txt
```

**Error: "Port 5000 already in use"**
- Close other applications using port 5000
- Or change the port in `app.py` (last line):
  ```python
  app.run(debug=True, host='0.0.0.0', port=8000)
  ```

### API not working

**"LLM API not configured"**
- Make sure `.env` file exists
- Check that `OPENAI_API_KEY` is set correctly
- Restart the server after changing `.env`

**"Invalid API key"**
- Verify your API key is correct
- Check you have credits/quota remaining
- Ensure no extra spaces in the `.env` file

### File upload issues

**"File type not allowed"**
- Only `.txt` and `.pdf` files are supported
- Check file extension is lowercase

**"File too large"**
- Maximum file size is 100MB
- Compress or split large files

### CORS errors in browser

The server has CORS enabled by default. If you still see errors:
1. Make sure you're accessing via `http://localhost:5000`
2. Check browser console for specific error messages
3. Try clearing browser cache

## Security Notes

1. **Never commit `.env` file** - It contains your API keys
2. **Keep API keys secret** - Don't share them publicly
3. **Monitor API usage** - Set up billing alerts on your LLM provider
4. **Use HTTPS in production** - Don't deploy with HTTP in production
5. **Implement rate limiting** - Add rate limits for production use

## Production Deployment

For production deployment, consider:

1. **Use a production WSGI server:**
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

2. **Set up HTTPS** with a reverse proxy (nginx, Apache)

3. **Use environment variables** instead of `.env` file

4. **Add authentication** for API endpoints

5. **Implement rate limiting** and request validation

6. **Set up monitoring** and logging

7. **Use a production database** for storing analysis results

## Support

If you encounter issues:

1. Check this guide first
2. Review the error messages in terminal
3. Check browser console for frontend errors
4. Verify your `.env` configuration
5. Test API endpoints with curl

## Development

To modify the LLM prompt or analysis logic, edit the `analyze_emotions_with_llm()` function in `app.py`.

To change the frontend behavior, edit `script.js`.

To modify styles, edit `styles.css`.

## Next Steps

Once everything is working:

1. Try analyzing some French text
2. Upload a `.txt` or `.pdf` file
3. Explore the pricing and FAQ pages
4. Customize the LLM prompt for your specific needs
5. Add more features as needed

---

**Happy Analyzing!**
