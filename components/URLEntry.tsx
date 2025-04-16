"use client";
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';

// styling for the div that conatins the text entry fields
const StyledDiv = styled.div`
  background-color: #afac9d;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// styling for the div that contains the shortened URL
const StyledReturnDiv = styled.div`
  background-color:#afac9d;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export default function UrlEntry() {
  // state variable initializations
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [error, setError] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  // function that hnadles URL validation using regex
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

  // function that handles the submit event of the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    // check if the input original URL is valid or not
    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL (must include http:// or https://).');
      return;
    }

    try {
      // check if the input alias is valid or not
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, alias }),
      });
      const data = await response.json();
      // check if the response is ok or not
      if (!response.ok) {
        setError(data.message);
      } else {
        // set the shortened URL to the alias state variable
        setShortUrl(`${window.location.origin}/${alias}`);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong:(');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <StyledDiv>
        <TextField label="Original URL" fullWidth required value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} helperText="Example: http(s)://example.com/very/long/url" />
        <TextField label="URL Alias" fullWidth required value={alias} onChange={(e) => setAlias(e.target.value)} helperText="Enter a custom alias for your URL" />
      </StyledDiv>

      <Button type="submit" variant="contained" fullWidth sx={{mb: 4, mt: 4, backgroundColor: '#afac9d','&:hover': {backgroundColor: '#005bb5' }}}>
        Generate Shortened URL
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {shortUrl && (
        <StyledReturnDiv>
          <Box>
            <Typography variant="h6">Shortened URL:</Typography>
            <TextField value={shortUrl} fullWidth />
          </Box>
        </StyledReturnDiv>
      )}
    </Box>
  );
}