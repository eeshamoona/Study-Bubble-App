import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { addLCard } from "../services/learning-card";

const Section1 = styled.section`
  background: transparent;
  width: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const Section2 = styled.div`
  display: flex;
  flex-flow: column;
  align-self: center;
`;

const AddButton = styled.button`
  background: transparent;
  border: none;
  font-size: 60px;
`;

const Text1 = styled.h3`
  font-size: 35px;
  font-weight: lighter;
  margin: 0px;
`;
const Text2 = styled.h3`
  font-size: 24px;
  font-weight: normal;
  margin: 0px;
`;

export default function MiddleHeader(props) {
  const handleOnClick = () => {
    if (props.alternate) {
      addLCard("", "", props.studyBubble["id"]).then((response) => {
        console.log(response);
        props.refreshCallback();
      });
    } else {
      props.refreshCallback();
    }
  };
  return (
    <Section1>
      {props.alternate ? (
        <Section2>
          <Text2>{format(props.date, "EEEE MMMM dd, yyyy")}</Text2>{" "}
        </Section2>
      ) : (
        <Section2>
          <Text1>{format(props.date, "MMMM dd, yyyy")}</Text1>
          <Text2>{format(props.date, "EEEE")}</Text2>
        </Section2>
      )}
      <AddButton onClick={handleOnClick}>+</AddButton>
    </Section1>
  );
}
