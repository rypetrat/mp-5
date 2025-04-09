"use client";
import React from "react";
import styled from "styled-components";
import { Geist } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const geist = Geist({ subsets: ["latin"], weight: ["400", "700"] });

const StyledBody = styled.body`
  background-color:rgb(48, 48, 48);
`;

export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
  return (
    <html lang="en" className={geist.className}>
      <head>
        <meta charSet="UTF-8"/>
        {/* <link rel="icon" type="image" href="/stock.png"/> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>CS391 | MP-5</title>
      </head>
      <StyledBody>
        {children}
      </StyledBody>
    </html>
  );
}
