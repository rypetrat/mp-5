"use client";
import React from "react";
import styled from "styled-components";
import { Geist } from "next/font/google";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"], weight: ["400", "700"] });

// styling for the body of the page
const StyledBody = styled.body`
  background-color:rgb(168, 168, 168);
`;

// defines the structure of the root of the page to dynamically render in components
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
  return (
    <html lang="en" className={geist.className}>
      <head>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>CS391 | MP-5</title>
      </head>
      <StyledBody>
        <Header />
        {children}
      </StyledBody>
    </html>
  );
}