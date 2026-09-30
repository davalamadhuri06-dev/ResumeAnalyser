import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// In-memory upload handler for resumes
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const N8N_FORM_URL = 'https://madhuridavala.app.n8n.cloud/form/f3941119-17ec-4836-ad69-e6fb23e836a1';

// Endpoint to fetch workflow information
app.get('/api/workflow-info', (req, res) => {
  res.json({
    name: 'Resume Analyser',
    url: N8N_FORM_URL,
    fields: [
      { id: 'field-0', name: 'Name', type: 'text', required: true },
      { id: 'field-1', name: 'Email', type: 'email', required: true },
      { id: 'field-2', name: 'Upload Resume', type: 'file', required: true, accept: ['.pdf', '.doc', '.docx', '.txt'] },
    ],
    status: 'online',
    timestamp: new Date().toISOString(),
  });
});

// Endpoint to proxy resume submission to n8n Cloud webhook
app.post('/api/submit-resume', upload.any(), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    const resumeFile = files && files.length > 0 ? files[0] : null;

    // Support both direct n8n field names and friendly names
    const name = (req.body['field-0'] || req.body['name'] || '').trim();
    const email = (req.body['field-1'] || req.body['email'] || '').trim();

    if (!name) {
      return res.status(400).json({ success: false, error: 'Candidate name is required' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email address is required' });
    }
    if (!resumeFile) {
      return res.status(400).json({ success: false, error: 'Resume file is required' });
    }

    // Prepare FormData matching n8n form schema:
    // field-0: Name
    // field-1: Email
    // field-2: Upload Resume (File)
    const n8nFormData = new FormData();
    n8nFormData.append('field-0', name);
    n8nFormData.append('field-1', email);

    const fileBlob = new Blob([new Uint8Array(resumeFile.buffer)], {
      type: resumeFile.mimetype || 'application/octet-stream',
    });
    n8nFormData.append('field-2', fileBlob, resumeFile.originalname || 'resume.pdf');

    // Forward to n8n Form URL
    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: n8nFormData,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8',
        'User-Agent': 'Resume-Analyser-Web/1.0',
      },
    });

    const contentType = n8nResponse.headers.get('content-type') || '';
    let responseData = '';
    let isJson = false;

    if (contentType.includes('application/json')) {
      const json = await n8nResponse.json();
      responseData = JSON.stringify(json);
      isJson = true;
    } else {
      responseData = await n8nResponse.text();
    }

    // If n8n answered OK (200-299) or redirected
    if (n8nResponse.ok || n8nResponse.status === 200 || n8nResponse.status === 302) {
      return res.json({
        success: true,
        message: 'Resume submitted successfully to n8n workflow!',
        n8nStatus: n8nResponse.status,
        candidate: { name, email, fileName: resumeFile.originalname, fileSize: resumeFile.size },
        n8nData: isJson ? JSON.parse(responseData) : undefined,
        formResponseSnippet: !isJson && responseData ? responseData.slice(0, 300) : undefined,
      });
    } else {
      // In case n8n returned a non-200 status
      return res.status(n8nResponse.status).json({
        success: false,
        error: `n8n server returned status ${n8nResponse.status}`,
        details: responseData.slice(0, 400),
      });
    }
  } catch (error: any) {
    console.error('Error forwarding resume to n8n:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit resume to workflow',
    });
  }
});

// Configure Vite middleware or static serving
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
