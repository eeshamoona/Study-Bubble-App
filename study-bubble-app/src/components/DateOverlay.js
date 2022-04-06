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

const HourLine = styled.div`
  border-top: 2px solid red;
  margin: 0px 15px;
  height: 0px;
`;

export default function DateOverlay(props) {
  const [studyBubbles, setStudyBubbles] = useState([]);

  useEffect(() => {
    getStudyBubbleWithDate(format(props.selectedDate, "MMddyyyy")).then(
      (response) => {
        setStudyBubbles(response);
      }
    );
  }, [props.selectedDate]);

  const getHeightDifference = (textStart, textEnd) => {
    const splitStringsStart = textStart.split(":");
    var initialHourStart = parseInt(splitStringsStart[0]);
    const minutesStart = parseInt(splitStringsStart[1].split(" ")[0]);
    const AMPMStart = splitStringsStart[1].split(" ")[1];

    const splitStringsEnd = textEnd.split(":");
    var initialHourEnd = parseInt(splitStringsEnd[0]);
    const minutesEnd = parseInt(splitStringsEnd[1].split(" ")[0]);
    const AMPMEnd = splitStringsEnd[1].split(" ")[1];

    if (AMPMStart == "PM") {
      initialHourStart = initialHourStart + 12;
    }
    if (AMPMEnd == "PM") {
      initialHourEnd = initialHourEnd + 12;
    }

    const startDateTime = new Date(
      `${format(
        props.selectedDate,
        "MMMM dd, yyyy"
      )} ${initialHourStart}:${minutesStart}:00`
    );
    const endDateTime = new Date(
      `${format(
        props.selectedDate,
        "MMMM dd, yyyy"
      )} ${initialHourEnd}:${minutesEnd}:00`
    );

    // replace top 60 with lineheight variable
    return diff_minutes(startDateTime, endDateTime);
  };

  const diff_minutes = (dt2, dt1) => {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.round(diff);
  };

  const calculateOffsetForCurrentTime = () => {
    var currentdate = new Date();
    var d1 = new Date(
      `${format(
        props.selectedDate,
        "MMMM dd, yyyy"
      )} ${currentdate.getHours()}:${currentdate.getMinutes()}:00`
    );
    const d2 = new Date(
      `${format(props.selectedDate, "MMMM dd, yyyy")} 13:00:00`
    );
    return diff_minutes(d1, d2);
  };

  const handleClick = (id) => {
    console.log("HERE" + id);
    props.activeStudyBubbleCallback(id);
  };

  return (
    <div className="outer">
      {studyBubbles.map((studybubble) => {
        const heightDifference =
          Math.abs(
            getHeightDifference(studybubble["starts"], studybubble["ends"])
          ) *
          (60 / 60);
        const offsetPixel = getHeightDifference(
          studybubble["starts"],
          "1:00 PM"
        );
        const topPosition =
          offsetPixel -
          (getHeightDifference(studybubble["starts"], studybubble["ends"]) *
            (60.75 / 60)) /
            2;
        return (
          <div
            onClick={() => handleClick(studybubble["id"])}
            style={{ top: `${topPosition}px` }}
            className="below"
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
      <div className="top">
        <HourlyView></HourlyView>
      </div>
      <div
        style={{ top: `${calculateOffsetForCurrentTime()}px` }}
        className="below"
      >
        <HourLine></HourLine>
      </div>
    </div>
  );
}
