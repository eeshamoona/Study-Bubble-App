import * as React from "react";
import styled from "styled-components";

const padding = "3em";
const margin = "2em";

const Section = styled.section`
  color: white;
  padding: ${padding};
  margin: ${margin};
  border-radius: 10px;
  background: rgba(22, 20, 51, 255);
`;

export default function StudyBubble() {
  return <Section></Section>;
}