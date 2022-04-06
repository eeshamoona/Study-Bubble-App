import React, { useState } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import LearningCard from "./LearningCard";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  background: transparent;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Section2 = styled.section`
  color: #f6f5fc;
  align-items: center;
  background: #aaa1fc;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  height: 200px;
  justify-content: center;
`;

export default function AddStudyBubble() {
  const [notesText, setNotesText] = useState("");
  const updateNotesText = (event) => {
    setNotesText(event.target.value);
  };

  return (
    <Section1>
      <Section2>Add Event Section Will Go Here</Section2>
    </Section1>
  );
}
