# EmoLetr API Documentation

Complete API documentation for the EmoLetr emotion analysis platform.

## Base URL

```
http://localhost:5000
```

## Authentication

Currently, no authentication is required for local development. For production deployment, implement API key authentication.

## Endpoints

### 1. Health Check

Check if the API is running and properly configured.

**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "healthy",
  "api_configured": true,
  "model": "gpt-4",
  "timestamp": "2025-11-02T13:30:00.000000"
}
```

**Status Codes:**
- `200 OK`: Server is healthy

---

### 2. Get Configuration

Get public configuration information.

**Endpoint:** `GET /api/config`

**Response:**
```json
{
  "max_file_size_mb": 100,
  "allowed_extensions": ["txt", "pdf"],
  "api_available": true
}
```

**Status Codes:**
- `200 OK`: Configuration retrieved

---

### 3. Analyze Text

Analyze emotions in French text using LLM.

**Endpoint:** `POST /api/analyze`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "text": "Votre texte français à analyser ici..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "text_length": 150,
  "analyzed_at": "2025-11-02T13:30:00.000000",
  "analysis": {
    "emotions": [
      {
        "type": "Joie",
        "intensity": 85,
        "percentage": 45,
        "passages": ["extrait du texte..."],
        "context": "Expression de bonheur personnel"
      },
      {
        "type": "Nostalgie",
        "intensity": 60,
        "percentage": 30,
        "passages": ["autre extrait..."],
        "context": "Référence au passé colonial"
      }
    ],
    "dominant_emotion": "Joie",
    "emotional_tone": "positif",
    "cultural_notes": "Le texte reflète des thèmes post-coloniaux...",
    "summary": "Analyse émotionnelle complète du texte"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Description de l'erreur"
}
```

**Status Codes:**
- `200 OK`: Analysis completed successfully
- `400 Bad Request`: No text provided or invalid input
- `500 Internal Server Error`: Server error during analysis
- `503 Service Unavailable`: LLM API not configured

---

### 4. Analyze File

Analyze emotions in uploaded text or PDF file.

**Endpoint:** `POST /api/analyze`

**Content-Type:** `multipart/form-data`

**Request Body:**
```
file: [Binary file data]
```

**Supported File Types:**
- `.txt` (Plain text)
- `.pdf` (PDF documents)

**Max File Size:** 100 MB

**Response:** Same as "Analyze Text" endpoint

**Status Codes:**
- `200 OK`: File analyzed successfully
- `400 Bad Request`: No file, invalid file type, or empty file
- `500 Internal Server Error`: Error processing file

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common Errors

**LLM Not Configured:**
```json
{
  "error": "LLM API not configured",
  "message": "Please set OPENAI_API_KEY in your .env file"
}
```

**Invalid File Type:**
```json
{
  "error": "File type not allowed. Only .txt and .pdf files are supported"
}
```

**No Text Provided:**
```json
{
  "error": "No text provided for analysis"
}
```

---

## Analysis Response Schema

### Emotions Array

Each emotion object contains:

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Name of the emotion (e.g., "Joie", "Tristesse") |
| `intensity` | number | Intensity score (0-100) |
| `percentage` | number | Percentage of text expressing this emotion |
| `passages` | array | Text excerpts expressing this emotion |
| `context` | string | Cultural or contextual notes |

### Root Analysis Object

| Field | Type | Description |
|-------|------|-------------|
| `emotions` | array | Array of detected emotions |
| `dominant_emotion` | string | Primary emotion in the text |
| `emotional_tone` | string | Overall tone: "positif", "négatif", "neutre", "mixte" |
| `cultural_notes` | string | Notes on post-colonial/cultural context |
| `summary` | string | Summary of the emotional analysis |

---

## Rate Limits

For local development, no rate limits are enforced.

**Production Recommendations:**
- Implement rate limiting (e.g., 100 requests/hour per IP)
- Add authentication with API keys
- Monitor LLM API usage and costs

---

## Example Usage

### JavaScript (Fetch API)

```javascript
// Analyze text
const analyzeText = async (text) => {
  const response = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text })
  });
  
  const data = await response.json();
  return data;
};

// Analyze file
const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  return data;
};
```

### Python (requests)

```python
import requests

# Analyze text
def analyze_text(text):
    response = requests.post(
        'http://localhost:5000/api/analyze',
        json={'text': text}
    )
    return response.json()

# Analyze file
def analyze_file(file_path):
    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(
            'http://localhost:5000/api/analyze',
            files=files
        )
    return response.json()
```

### cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Analyze text
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Je suis très heureux aujourd'\''hui!"}'

# Analyze file
curl -X POST http://localhost:5000/api/analyze \
  -F "file=@document.txt"
```

---

## LLM Configuration

The API uses OpenAI's GPT models by default. Configure via `.env`:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-key-here
LLM_MODEL=gpt-4

# Custom Endpoint (optional)
LLM_API_BASE=https://custom-endpoint.com/v1
```

### Supported Models

- `gpt-4` - Most capable, best for complex analysis
- `gpt-4-turbo-preview` - Faster, cost-effective
- `gpt-3.5-turbo` - Fastest, cheapest

### Custom LLM Providers

The API supports any OpenAI-compatible endpoint:
- Azure OpenAI
- Anthropic Claude (with adapter)
- Local LLMs (Ollama, LM Studio)
- Hugging Face Inference API

---

## Performance

**Typical Response Times:**
- Text analysis (< 1000 words): 3-8 seconds
- File upload + analysis: 5-15 seconds
- Health check: < 100ms

**Factors Affecting Speed:**
- LLM model choice (GPT-4 slower than GPT-3.5)
- Text length
- API provider latency
- Network conditions

---

## Best Practices

1. **Validate input** before sending to API
2. **Handle errors gracefully** with user-friendly messages
3. **Show loading states** during analysis
4. **Cache results** when appropriate
5. **Limit text length** for faster responses (< 4000 words recommended)
6. **Monitor API costs** if using paid LLM services
7. **Implement retries** for transient failures

---

## Security Considerations

1. **Never expose API keys** in frontend code
2. **Validate file uploads** (size, type, content)
3. **Sanitize user input** to prevent injection attacks
4. **Implement rate limiting** in production
5. **Use HTTPS** in production environments
6. **Add authentication** for production APIs
7. **Log and monitor** API usage

---

## Troubleshooting

### "LLM API not configured"
- Check `.env` file exists
- Verify `OPENAI_API_KEY` is set
- Restart server after changing `.env`

### Slow responses
- Use faster model (gpt-3.5-turbo)
- Reduce text length
- Check network connection
- Verify LLM API status

### File upload fails
- Check file size (< 100MB)
- Verify file type (.txt or .pdf)
- Ensure file is not corrupted
- Check server disk space

---

## Support

For issues or questions:
1. Check [SETUP.md](SETUP.md) for configuration help
2. Review error messages in server logs
3. Test with curl to isolate frontend/backend issues
4. Verify LLM API key and quota

---

**Version:** 1.0.0  
**Last Updated:** November 2, 2025
