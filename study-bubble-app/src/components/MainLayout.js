import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import MiddleHeader from "./MiddleHeader";
import StudyBubble from "./StudyBubble";
import StudySideBar from "./StudySideBar";
import TLDRSection from "./TLDRSection";
import DateOverlay from "./DateOverlay";
import AddStudyBubble from "./AddStudyBubble";
import { getStudyBubble } from "../services/study-bubble";
import SummaryAdd from "./SummaryAdd";

const borderRadius = "17px";

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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const NumberText = styled.text`
  font-size: 30px;
`;

const Container = styled.div`
  display: flex;
  background: transparent;
  flex-direction: column;
  text-align: center;
`;

const SubText = styled.text`
  font-size: 14px;
`;

const Section6 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0px;
`;

const Section7 = styled.div`
  background: transparent;
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
  const [currStudyBubble, setCurrStudyBubble] = useState({});

  const updateActiveStudyBubbleId = (id) => {
    setActiveStudyBubbleID(id);
    getStudyBubble(id).then((response) => setCurrStudyBubble(response));
    setAddEvent(false);
    setRefresh(!refresh);
  };

  //TODO: Fix these refresh bugs
  const addCallback = () => {
    //If it is StudyBubbleView that means that we have just added an LCard
    //need to refresh sideBar, studybubblePage

    //If it is not a StudyBubbleView that means we are going to add an evernt
    //need to turnOnAddEvent
    if (!isStudyBubbleView) {
      setAddEvent(true);
    } else {
      updateActiveStudyBubbleId(currStudyBubble["id"]);
    }
    setRefresh(!refresh);
  };

  const buttonRefreshCallback = (id) => {
    //If this is called it is called within the AddStudyBubble and means we
    //have just added a new event
    //need to call updateActiveStudyBubbleId with the new id
    //setAddEvent to false

    updateActiveStudyBubbleId(id);
    setRefresh(!refresh);
  };

  return (
    <Section1>
      {isStudyBubbleView ? (
        <StudySideBar
          studyBubble={currStudyBubble}
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
            refreshCallback={addCallback}
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
              refresh={refresh}
            ></DateOverlay>
          )}
        </Section4>
        <Section3>
          <div style={{ flex: 1 }}>
            <Calendar dateCallback={setSelectedDate}></Calendar>
          </div>
          <Section5>
            {addEvent ? (
              <AddStudyBubble
                selectedDate={selectedDate}
                refreshCallback={buttonRefreshCallback}
              ></AddStudyBubble>
            ) : activeStudyBubbleID ? (
              <>
                {isStudyBubbleView ? (
                  <>
                    <SummaryAdd
                      color={currStudyBubble["color"]}
                      studyBubble={currStudyBubble}
                    ></SummaryAdd>
                    <Button onClick={updateIstStudyBubbleView}>
                      Close the Study Bubble
                    </Button>
                  </>
                ) : (
                  <>
                    <TLDRSection
                      color={currStudyBubble["color"]}
                      studyBubble={currStudyBubble}
                    ></TLDRSection>
                    <Section7>
                      <Section6>
                        <Container>
                          <NumberText>{currStudyBubble["card_num"]}</NumberText>
                          <SubText>Learning Cards</SubText>
                        </Container>
                        <Container>
                          <NumberText>0</NumberText>
                          <SubText>Minutes Studied</SubText>
                        </Container>
                      </Section6>
                      <Button onClick={updateIstStudyBubbleView}>
                        Open this Study Bubble
                      </Button>
                    </Section7>
                  </>
                )}
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
