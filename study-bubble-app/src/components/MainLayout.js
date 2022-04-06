import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import HourlyView from "./HourlyView";
import MiddleHeader from "./MiddleHeader";
import StudyBubble from "./StudyBubble";
import StudySideBar from "./StudySideBar";
import SummarySection from "./SummarySection";
import DateOverlay from "./DateOverlay";
import AddStudyBubble from "./AddStudyBubble";
import { getStudyBubble } from "../services/study-bubble";

const borderRadius = "17px";
const margin = "2em";

const Section1 = styled.section`
  border-radius: ${borderRadius};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background: #cbc6f7;
  display: flex;
`;

const Section2 = styled.section`
  border-radius: ${borderRadius};
  height: -webkit-fill-available;
  width: -webkit-fill-available;

  background: #f6f5fc;
  margin: 30px;
  display: flex;
`;

const Section3 = styled.div`
  width: 360px;
  float: right;
  padding: 20px;
  border-radius: ${borderRadius};
  background: #e8e8f6;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
`;

const Section4 = styled.div`
  display: flex;
  flex-flow: column;
  width: -webkit-fill-available;
`;

const Section5 = styled.section`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #f6f5fc;
  border-radius: 50px;
  width: -webkit-fill-available;
  height: 40px;
  font-size: 24px;
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;

export default function MainLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isStudyBubbleView, setIsStudyBubbleView] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [addEvent, setAddEvent] = useState(false);

  const updateIstStudyBubbleView = () => {
    setIsStudyBubbleView(!isStudyBubbleView);
  };
  const updateAddEvent = () => {
    setAddEvent(!addEvent);
  };
  const [activeStudyBubbleID, setActiveStudyBubbleID] = useState(null);
  const [studyBubble, setStudyBubble] = useState({});

  const updateActiveStudyBubbleId = (id) => {
    setAddEvent(false);
    setActiveStudyBubbleID(id);
    getStudyBubble(id).then((response) => setStudyBubble(response));
  };

  const refreshCallback = () => {
    //This means that they have clicked the + in the calendar page
    if (!isStudyBubbleView) {
      updateAddEvent();
    }
    setRefresh(!refresh);
  };

  return (
    <Section1>
      {isStudyBubbleView ? (
        <StudySideBar
          studyBubbleId={activeStudyBubbleID}
          refresh={refresh}
        ></StudySideBar>
      ) : (
        <div style={{ width: "250px" }}></div>
      )}
      <Section2>
        <Section4>
          <MiddleHeader
            date={selectedDate}
            alternate={isStudyBubbleView}
            studyBubbleId={isStudyBubbleView ? activeStudyBubbleID : null}
            refreshCallback={refreshCallback}
          ></MiddleHeader>
          {isStudyBubbleView ? (
            <StudyBubble
              studyBubbleId={activeStudyBubbleID}
              refresh={refresh}
            ></StudyBubble>
          ) : (
            <DateOverlay
              activeStudyBubbleCallback={updateActiveStudyBubbleId}
              selectedDate={selectedDate}
            ></DateOverlay>
          )}
        </Section4>
        <Section3>
          <div style={{ flex: 1 }}>
            <Calendar dateCallback={setSelectedDate}></Calendar>
          </div>
          <Section5>
            {addEvent ? (
              <>
                <AddStudyBubble></AddStudyBubble>
                <Button>Add Study Bubble</Button>
              </>
            ) : activeStudyBubbleID ? (
              <>
                <SummarySection color={studyBubble["color"]}></SummarySection>
                <Button onClick={updateIstStudyBubbleView}>
                  {isStudyBubbleView
                    ? "Close the Study Bubble"
                    : "Open this Study Bubble"}
                </Button>
              </>
            ) : (
              <div></div>
            )}
          </Section5>
        </Section3>
      </Section2>
    </Section1>
  );
}
