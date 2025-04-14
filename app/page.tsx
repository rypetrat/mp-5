"use client";
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import UrlEntry from '@/components/URLEntry';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography gutterBottom align="center" />
        <UrlEntry />
      </Box>
    </Container>
  );
}