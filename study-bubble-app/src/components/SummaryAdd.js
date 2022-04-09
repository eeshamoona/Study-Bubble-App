import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskBubble from "./LearningCard";
import LearningCard from "./LearningCard";
import { set } from "date-fns";
import { updateSummary } from "../services/study-bubble";

const padding = "3em";
const margin = "2em";

const Section1 = styled.section`
  background: transparent;
  justify-content: center;
`;

const Section2 = styled.section`
  background: ${(props) => props.color};
  align-items: center;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  justify-content: center;
  padding: 10px 5px;
  max-height: 270px;
`;

const Section3 = styled.section`
  align-items: center;
  border-radius: 17px;
  height: 100%;
  overflow-y: scroll;
  max-width: 100%;
  margin: 10px 0px;
`;

const Section4 = styled.section`
  border-radius: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: -webkit-fill-available;
`;

const InputText = styled.textarea`
  border-radius: 17px;
  background: white;
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  padding: 10px;
  height: 20px;
  overflow-y: scroll;
  resize: none;
  flex: auto;
`;

const EnterButton = styled.button`
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  background: ${(props) => props.color};
  filter: brightness(120%);
  width: 40px;
  height: 40px;
  margin-left: 20px;
  box-shadow: 0px 3px 6px #00000029;
  font-size: 20px;
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
  font-size: 24px;
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

export default function SummaryAdd(props) {
  const [notesText, setNotesText] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [value, setValue] = useState("");
  const [tldrs, setTldrs] = useState([]);

  const updateNotesText = (event) => {
    setNotesText(event.target.value);
  };

  useEffect(() => {
    if (props.studyBubble && props.studyBubble["summary"]) {
      console.log(props.studyBubble["summary"]);
      const tempArray = props.studyBubble["summary"].split(";");
      setTldrs(tempArray);
    }
  }, [props.studyBubble]);

  const updateValue = (event) => {
    setValue(event.target.value);
  };
  const submit = () => {
    if (props.studyBubble && props.studyBubble["summary"]) {
      var text = props.studyBubble["summary"];
      text = text + ";" + value;

      updateSummary(props.studyBubble, text).then((response) => {
        props.refreshCallback();
        setValue("");
      });
    }
  };

  return (
    <Section1>
      <Section2 color={props.color}>
        <>
          <TLDRText>Session Summary</TLDRText>
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
          <InputText value={value} onChange={updateValue}>
            Placeholder
          </InputText>
          <EnterButton onClick={submit} color={props.color}>
            &#10548;
          </EnterButton>
        </Section4>
      </Section2>
    </Section1>
  );
}
