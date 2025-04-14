"use client";
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function UrlEntry() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const isValidUrl = (url: string): boolean => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + 
        '((\\d{1,3}\\.){3}\\d{1,3}))' + 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
        '(\\?[;&a-z\\d%_.~+=-]*)?' + 
        '(\\#[-a-z\\d_]*)?$', 'i'
    );
    return urlPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (must include http:// or https://).');
      return;
    }

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, alias }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        setShortUrl(`${window.location.origin}/${alias}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong:(');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField label="Original URL" fullWidth required value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} helperText="Example: http(s)://example.com/very/long/url" />
      <TextField label="URL Alias" fullWidth required value={alias} onChange={(e) => setAlias(e.target.value)} helperText="Enter a custom alias for your URL" />
      
      <Button type="submit" variant="contained" fullWidth sx={{mt: 4, backgroundColor: '#afac9d','&:hover': {backgroundColor: '#005bb5' }}}>
        Generate Shortened URL
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {shortUrl && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Shortened URL:</Typography>
          <TextField value={shortUrl} fullWidth />
        </Box>
      )}
    </Box>
  );
}