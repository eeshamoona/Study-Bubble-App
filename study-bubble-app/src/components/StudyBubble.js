import * as React from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import LearningCard from "./LearningCard";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  background: transparent;
  width: -webkit-fill-available;
  overflow-y: scroll;
  margin-top: 20px;
  margin-bottom: 5px;
  direction: rtl;
  margin-left: 20px;
`;

const Section2 = styled.section`
  background: transparent;
  width: -webkit-fill-available;
  display: contents;
  flex-direction: column;
  text-align: center;
`;


const TitleText = styled.text`
  font-size: 40px;
`;

const LocationText = styled.text`
  font-size: 18px;
`;

export default function StudyBubble() {
  return (
    <Section2>
      <TitleText>History Study Session</TitleText>
      <LocationText>Location: History Building, UIUC</LocationText>
      <Section1>
        <LearningCard></LearningCard>
        <LearningCard></LearningCard>
        <LearningCard></LearningCard>
        <LearningCard></LearningCard>
      </Section1>
    </Section2>
  );
}
