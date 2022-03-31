import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendar";
import HourlyView from "./HourlyView";
import MainHeader from "./MiddleHeader";

const borderRadius = "7px";
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
`;

const Section2 = styled.section`
  border-radius: ${borderRadius};
  height: -webkit-fill-available;
  background: #f6f5fc;
  margin-top: 30px;
  margin-left: 230px;
  margin-bottom: 30px;
  margin-right: 30px;
  display: flex;
`;

const Section3 = styled.section`
  width: 360px;
  float: right;
  padding: 20px;
  border-radius: ${borderRadius};
  background: #e8e8f6;
  height: -webkit-fill-available;
`;

const Section4 = styled.div`
  display: flex;
  flex-flow: column;
  width: -webkit-fill-available;
`;

export default function MainLayout() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Section1>
      <Section2>
        <Section4>
          <MainHeader date={selectedDate} alternate={false}></MainHeader>
          <HourlyView></HourlyView>
        </Section4>
        <Section3>
          <div>
            <Calendar dateCallback={setSelectedDate}></Calendar>
          </div>
        </Section3>
      </Section2>
    </Section1>
  );
}
