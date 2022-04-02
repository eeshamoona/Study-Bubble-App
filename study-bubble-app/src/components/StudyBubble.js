import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import LearningCard from "./LearningCard";
import { getLCardsFromStudyBubble } from "../services/learning-card";
import { getStudyBubble } from "../services/study-bubble";

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

export default function StudyBubble(props) {
  const [LCards, setLCards] = useState([]);
  const [StudyBubble, setStudyBubble] = useState({});

  useEffect(() => {
    getStudyBubble(props.studyBubbleId).then((response) =>
      setStudyBubble(response)
    );
    getLCardsFromStudyBubble(props.studyBubbleId).then((response) =>
      setLCards(response)
    );
  }, [props]);
  return (
    <Section2>
      <TitleText>{StudyBubble["title"]}</TitleText>
      <LocationText>{StudyBubble["location"]}</LocationText>
      <Section1>
        {LCards.map((card) => (
          <LearningCard learningCard={card}></LearningCard>
        ))}
      </Section1>
    </Section2>
  );
}
