import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LearningCard from "./LearningCard";
import { getLCardsFromStudyBubble } from "../services/learning-card";
import { getStudyBubble } from "../services/study-bubble";

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

  useEffect(() => {
    getLCardsFromStudyBubble(props.studyBubble["id"]).then((response) => {
      console.log(response);
      setLCards(response);
    });
  }, [props.refresh, props.studyBubble]);
  return (
    <Section2>
      <TitleText>{props.studyBubble["title"]}</TitleText>
      <LocationText>{props.studyBubble["location"]}</LocationText>
      <Section1>
        {LCards.slice(0)
          .reverse()
          .map((card) => (
            <LearningCard learningCard={card}></LearningCard>
          ))}
      </Section1>
    </Section2>
  );
}
