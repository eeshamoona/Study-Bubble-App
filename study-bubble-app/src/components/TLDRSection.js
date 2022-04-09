import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import LearningCard from "./LearningCard";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  background: transparent;
  display: flex;
  flex-direction: column;
  max-height: 248px;
`;

const Section2 = styled.section`
  background: ${(props) => props.color};
  align-items: center;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  justify-content: center;
  padding: 20px 10px;
`;

const Section3 = styled.section`
  align-items: center;
  border-radius: 17px;
  overflow-y: scroll;
  max-width: 100%;
`;

const TitleText = styled.text`
  font-size: 24px;
  text-align: center;
`;

const LocationText = styled.text`
  font-size: 14px;
  text-align: center;
`;

const TLDRText = styled.text`
  font-size: 18px;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SummaryText = styled.text`
  background: white;
  width: auto;
  border-radius: 30px;
  padding: 10px;
  text-align: center;
  margin: 5px;
  font-size: 11px;
  box-shadow: 0px 3px 6px #00000029;
`;

const List = styled.ul`
  list-style: none;
  display: inline-flex;
  margin: 0px;
  padding: 0px;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
`;

export default function TLDRSection(props) {
  const [notesText, setNotesText] = useState("");
  const [tldrs, setTldrs] = useState([]);
  const updateNotesText = (event) => {
    setNotesText(event.target.value);
  };

  useEffect(() => {
    console.log("OOF");
    if (props.studyBubble && props.studyBubble["summary"]) {
      console.log(props.studyBubble["summary"]);
      const tempArray = props.studyBubble["summary"].split(";");
      setTldrs(tempArray);
    }
  }, [props.studyBubble]);

  return (
    <Section1>
      <Section2 color={props.color}>
        <TitleText>{props.studyBubble["title"]}</TitleText>
        <LocationText>{props.studyBubble["location"]}</LocationText>
      </Section2>
      <>
        <TLDRText>Summary:</TLDRText>
        <Section3>
          <List>
            {tldrs.map((tldrText) => (
              <ListItem key={tldrText}>
                <SummaryText>{tldrText}</SummaryText>
              </ListItem>
            ))}
          </List>
        </Section3>
      </>
    </Section1>
  );
}
