import React from "react";
import styled from "styled-components";

const Section = styled.section`
  background: transparent;
  width: -webkit-fill-available;
  padding: 20px 0px;
  overflow-y: scroll;
`;

const HourLine = styled.div`
  border-top: 1px solid #707070;
  margin-left: 50px;
  margin-left: 10px;
  height: 60px;
  flex: 1;

  &:hover {
    background: white;
    filter: brightness(111%);
  }
`;

const Text1 = styled.p`
  margin-top: -10px;
  text-align: left;
  letter-spacing: 0px;
  color: #707070;
  opacity: 0.7;
`;

const HourSection = styled.div`
  display: flex;
  margin: 0px 20px;
  height: auto;
`;

const getHourLines = () => {
  const hours = [];
  for (let hour = 1; hour < 12; hour++) {
    hours.push(
      <HourSection key={hour + "AM"}>
        <Text1>{hour} AM</Text1>
        <HourLine></HourLine>
      </HourSection>
    );
  }
  hours.push(
    <HourSection key={"Noon"}>
      <Text1>Noon</Text1>
      <HourLine></HourLine>
    </HourSection>
  );
  for (let hour = 1; hour < 12; hour++) {
    hours.push(
      <HourSection key={hour + "PM"}>
        <Text1>{hour} PM</Text1>
        <HourLine></HourLine>
      </HourSection>
    );
  }
  hours.push(
    <HourSection key={"Midnight"}>
      <Text1>Midnight</Text1>
      <HourLine></HourLine>
    </HourSection>
  );
  return <Section>{hours}</Section>;
};
export default function HourlyView(props) {
  return getHourLines();
}
