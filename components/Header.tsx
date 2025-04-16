"use client";
import styled from "styled-components";

// styling for the header
const StyledHeader = styled.header`
    background-color: #005bb5;
    padding: 0.5%;
`;

// styling for the h1 tag in the header
const StyledH1 = styled.h1`
    margin-left: 10px;
    color: white;
`;

// exports the header component
export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>CS391 MP-5 URL-Shortener</StyledH1>
    </StyledHeader>
  );
}