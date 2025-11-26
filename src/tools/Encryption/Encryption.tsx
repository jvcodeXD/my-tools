'use client';

import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

type ModeType = 'encrypt' | 'decrypt';

export default function Encryption() {
  const [text, setText] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [mode, setMode] = useState<ModeType>('encrypt');
  const [error, setError] = useState<string>('');

  const handleProcess = () => {
    setError('');
    
    if (!text.trim() || !key.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    try {
      if (mode === 'encrypt') {
        const encrypted = CryptoJS.AES.encrypt(text, key).toString();
        setResult(encrypted);
      } else {
        const decrypted = CryptoJS.AES.decrypt(text, key);
        const originalText = decrypted.toString(CryptoJS.enc.Utf8);
        
        if (!originalText) {
          setError('No se pudo desencriptar. Verifica la clave.');
          return;
        }
        
        setResult(originalText);
      }
    } catch (error) {
      setError('Error: ' + (error as Error).message);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🔐 Encriptación / Desencriptación
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Encripta y desencripta texto usando AES
      </Typography>

      <Stack spacing={3}>
        {/* Mode */}
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant={mode === 'encrypt' ? 'contained' : 'outlined'}
            onClick={() => setMode('encrypt')}
          >
            🔒 Encriptar
          </Button>
          <Button
            fullWidth
            variant={mode === 'decrypt' ? 'contained' : 'outlined'}
            onClick={() => setMode('decrypt')}
          >
            🔓 Desencriptar
          </Button>
        </Stack>

        {/* Text Input */}
        <Box>
          <Typography variant="h6" gutterBottom>
            {mode === 'encrypt' ? 'Texto a encriptar' : 'Texto encriptado'}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingresa el texto..."
          />
        </Box>

        {/* Key Input */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Clave de {mode === 'encrypt' ? 'encriptación' : 'desencriptación'}
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Ingresa una clave..."
          />
        </Box>

        {/* Error */}
        {error && (
          <Box sx={{ p: 2, bgcolor: '#fee', border: '1px solid #fcc', borderRadius: 1 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {/* Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleProcess}
          >
            {mode === 'encrypt' ? 'Encriptar' : 'Desencriptar'}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => { setText(''); setKey(''); setResult(''); setError(''); }}
          >
            Limpiar
          </Button>
        </Stack>

        {/* Result */}
        {result && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Resultado
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={result}
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f5f5f5' }}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2 }}
              onClick={() => navigator.clipboard.writeText(result)}
            >
              📋 Copiar
            </Button>
          </Box>
        )}
      </Stack>
    </Box>
  );
}