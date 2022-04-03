import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getStudyBubbleWithDate } from "../services/study-bubble";
import { format } from "date-fns";
import HourlyView from "./HourlyView";
import "./DateOverlay.css";

const Section = styled.section`
  background: transparent;
  overflow-y: scroll;
`;

const DateObject = styled.div`
  display: flex;
  margin: 0px 20px;
  height: 100px;
  background: ${(props) => props.color};
  border-radius: 17px;
`;

export default function DateOverlay(props) {
  const [studyBubbles, setStudyBubbles] = useState([]);

  useEffect(() => {
    console.log(format(props.selectedDate, "MMddyyyy"));
    getStudyBubbleWithDate(format(props.selectedDate, "MMddyyyy")).then(
      (response) => {
        setStudyBubbles(response);
      }
    );
  }, [props.selectedDate]);

  return (
    <divOuter class="outer">
      <div class="top">
        <Section>
          {studyBubbles.map((studybubble) => {
            return (
              <DateObject color={studybubble["color"]}>
                {studybubble["date"]}
              </DateObject>
            );
          })}
        </Section>
      </div>
      <div class="below">
        <HourlyView></HourlyView>
      </div>
    </divOuter>
  );
}
