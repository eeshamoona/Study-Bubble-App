import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import { updateLCard } from "../services/learning-card";

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
  flex-direction: row-reverse;
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

export default function LearningCard(props) {
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");

  const updateFrontText = (event) => {
    setFrontText(event.target.value);
  };

  const updateBackText = (event) => {
    setBackText(event.target.value);
  };

  const sendData = () => {
    updateLCard(
      frontText,
      backText,
      props.learningCard["study_bubble_id"],
      props.learningCard["id"]
    ).then((response) => console.log(response));
  };

  useEffect(() => {
    if (props.learningCard) {
      setFrontText(props.learningCard["front"]);
      setBackText(props.learningCard["back"]);
    }
  }, [props]);
  return (
    <Section2>
      <Section1>
        <StyledTextarea
          type="textarea"
          value={frontText}
          onChange={updateFrontText}
          onBlur={sendData}
        />
      </Section1>
      <Section1>
        <StyledTextarea
          type="textarea"
          value={backText}
          onChange={updateBackText}
          onBlur={sendData}
        />
      </Section1>
    </Section2>
  );
}
