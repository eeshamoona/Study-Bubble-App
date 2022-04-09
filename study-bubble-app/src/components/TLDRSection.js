import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import LearningCard from "./LearningCard";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  background: transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Section2 = styled.section`
  align-items: center;
  background: ${(props) => props.color};
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  justify-content: center;
  padding: 20px 10px;
`;

const Section3 = styled.section`
  margin-top: 20px;
  align-items: center;
  border-radius: 17px;
  display: grid;
  flex-direction: column;
  height: 100%;
`;
const Section4 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const TitleText = styled.text`
  font-size: 24px;
  text-align: center;
`;

const LocationText = styled.text`
  font-size: 14px;
  text-align: center;
`;

const NumberText = styled.text`
  font-size: 40px;
`;

const Container = styled.div`
  display: flex;
  background: transparent;
  flex-direction: column;
  text-align: center;
`;

const SubText = styled.text`
  font-size: 18px;
`;

const TLDRText = styled.text`
  font-size: 18px;
  margin-left: 10px;
  margin-top: 20px;
`;

const SummaryText = styled.text`
  background: white;
  border-radius: 30px;
  padding: 10px;
  text-align: center;
  width: fit-content;
  margin: 5px;
  font-size: 11px;
  box-shadow: 0px 3px 6px #00000029;
`;

const List = styled.ul`
  list-style: none;
  display: inline-flex;
  margin: 0px;
  padding: 0px;
  height: 100%;
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
      <Section4>
        <Container>
          <NumberText>{props.studyBubble["card_num"]}</NumberText>
          <SubText>Learning Cards</SubText>
        </Container>
        <Container>
          <NumberText>0</NumberText>
          <SubText>Minutes Studied</SubText>
        </Container>
      </Section4>
    </Section1>
  );
}
