import React, { useState } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  background: white;
  width: 333px;
  height: 188px;
  border-radius: 17px;
  border: none;
  margin-bottom: 20px;
  box-shadow: 0px 3px 6px #00000029;
`;

const Section2 = styled.section`
  background: transparent;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  overflow: hidden;
  margin: 20px;
  text-align: center;
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  border: none;
`;

const saveInput = () => {};

export default function LearningCard() {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const updateFrontText = (event) => {
    setFrontText(event.target.value);
  };

  const updateBackText = (event) => {
    setBackText(event.target.value);
  };

  return (
    <Section2>
      <Section1>
        <StyledTextarea
          type="textarea"
          value={frontText}
          onChange={updateFrontText}
        />
      </Section1>
      <Section1>
        <StyledTextarea
          type="textarea"
          value={backText}
          onChange={updateBackText}
        />
      </Section1>
    </Section2>
  );
}
