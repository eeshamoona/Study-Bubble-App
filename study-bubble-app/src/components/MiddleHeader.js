import React, { useEffect } from "react";
import styled from "styled-components";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from "date-fns";

import { addLCard } from "../services/learning-card";

const borderRadius = "7px";
const margin = "2em";

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

const Text1 = styled.text`
  font-size: 35px;
  font-weight: lighter;
`;
const Text2 = styled.text`
  font-size: 24px;
  font-weight: normal;
`;

export default function MiddleHeader(props) {
  const handleOnClick = () => {
    if (props.studyBubbleId) {
      addLCard("", "", props.studyBubbleId);
      props.refreshCallback()
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
