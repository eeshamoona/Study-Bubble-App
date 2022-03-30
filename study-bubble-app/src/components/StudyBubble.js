import * as React from "react";
import styled from "styled-components";
import TaskBubble from "./TaskBubble";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  color: white;
  padding: ${padding};
  margin: ${margin};
  border-radius: 5px;
  background: #bb747b;
`;

const Button = styled.button`
  color: black;
  border-radius: 5px;
`;

export default function StudyBubble() {
  return (
    <Section1>
      <Button>Hello!</Button>
    </Section1>
  );
}
