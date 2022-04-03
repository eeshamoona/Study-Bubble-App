import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getStudyBubbleWithDate } from "../services/study-bubble";
import { format } from "date-fns";
import HourlyView from "./HourlyView";
import "./DateOverlay.css";

const Section = styled.section`
  background: transparent;
  overflow-y: scroll;
  position: "relative";
`;

const DateObject = styled.div`
  display: flex;
  margin: 0px 20px;
  background: ${(props) => props.color};
  border-radius: 17px;
  box-shadow: 0px 3px 6px #00000029;
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

  const getStartPosition = (textTime) => {
    const splitStrings = textTime.split(":");
    const initialHour = parseInt(splitStrings[0]);
    const minutes = parseInt(splitStrings[1].split(" ")[0]);
    const AMPM = splitStrings[1].split(" ")[1];

    var position = 0; //This means we start at 1pm

    if (AMPM == "AM") {
      const temp = 12 - initialHour + 1;
      position = -48 * (temp);
    } else {
      const temp = initialHour - 1;
      position = 48 * (temp + 2);
    }

    return position;
  };

  const getHeightDifference = (textStart, textEnd) => {
    const splitStringsStart = textStart.split(":");
    const initialHourStart = parseInt(splitStringsStart[0]);
    const minutesStart = parseInt(splitStringsStart[1].split(" ")[0]);
    const AMPMStart = splitStringsStart[1].split(" ")[1];

    const splitStringsEnd = textEnd.split(":");
    const initialHourEnd = parseInt(splitStringsEnd[0]);
    const minutesEnd = parseInt(splitStringsEnd[1].split(" ")[0]);
    const AMPMEnd = splitStringsEnd[1].split(" ")[1];

    var temp = 0;

    if (AMPMStart == "AM") {
      if (AMPMEnd == "AM") {
        temp = initialHourEnd - initialHourStart;
      } else {
        const temp1 = 12 - initialHourStart;
        const temp2 = initialHourEnd + 1;
        temp = temp1 + temp2;
      }
    } else {
      temp = initialHourEnd - initialHourStart;
    }
    return 48 * temp;
  };

  const handleClick = (id) => {
    props.activeStudyBubbleCallback(id);
  }

  return (
    <divOuter class="outer">
      {studyBubbles.map((studybubble) => {
        const topPosition = getStartPosition(studybubble["starts"]);
        const heightDifference = getHeightDifference(
          studybubble["starts"],
          studybubble["ends"]
        );
        return (
          <div
          onClick={handleClick(studybubble['id'])}
            style={{ top: `${topPosition}px` }}
            class="below"
          >
            <DateObject
              style={{ height: `${heightDifference}px` }}
              color={studybubble["color"]}
            >
              {studybubble["title"]}
            </DateObject>
          </div>
        );
      })}
      <div class="top">
        <HourlyView></HourlyView>
      </div>
    </divOuter>
  );
}
