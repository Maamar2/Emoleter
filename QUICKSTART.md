# EmoLetr Quick Start Guide

Get up and running in 5 minutes!

## Super Quick Start

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set up your API key
copy .env.example .env
# Edit .env and add: OPENAI_API_KEY=your-key-here

# 3. Start server
python app.py

# 4. Open browser
# Go to: http://localhost:5000
```

## Get Your API Key

**OpenAI (Recommended):**
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Paste in `.env` file

## First Analysis

1. Open http://localhost:5000
2. Type or paste French text in the text box
3. Click "Configurer l'analyse"
4. Wait 5-10 seconds
5. See your emotion analysis results!

## Upload a File

1. Click "Choisir un fichier"
2. Select a `.txt` or `.pdf` file
3. File will be automatically analyzed
4. View results in the right panel

## Quick Commands

```bash
# Start server
python app.py

# Start with batch file (Windows)
start.bat

# Test API health
curl http://localhost:5000/api/health

# Analyze text via API
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Je suis heureux!\"}"
```

## Common Issues

**"Module not found"**
```bash
pip install -r requirements.txt
```

**"LLM API not configured"**
- Edit `.env` file
- Add your `OPENAI_API_KEY`
- Restart server

**"Port already in use"**
- Close other apps on port 5000
- Or change port in `app.py` (line 187)

**"Cannot connect to server"**
- Make sure server is running
- Check terminal for errors
- Try restarting server

## Need More Help?

- **Full Setup:** See [SETUP.md](SETUP.md)
- **API Docs:** See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Project Info:** See [README.md](README.md)

## You're Ready!

Start analyzing French literature with AI-powered emotion detection!

---

**Tips:**
- Use GPT-4 for best results (set in `.env`)
- Shorter texts analyze faster
- Export results with the export button
- Check pricing page for feature comparison
