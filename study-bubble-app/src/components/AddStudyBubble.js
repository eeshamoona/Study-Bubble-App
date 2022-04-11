import React, { useState } from "react";
import styled from "styled-components";
import { CirclePicker } from "react-color";
import Switch from "react-switch";
import { format } from "date-fns";
import { addStudyBubble } from "../services/study-bubble";

const Section1 = styled.section`
  background: transparent;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Section2 = styled.div`
  color: #f6f5fc;
  background: ${(props) => props.color};
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  align-items: center;
`;

const SwatchDiv = styled.div`
  padding: 5px;
  border: 1px solid #dadce0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  box-shadow: 0px 3px 6px #00000029;
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

const ColorDiv = styled.div`
  padding: 5px;
  background: ${(props) => props.color};
  border-radius: 50%;
  cursor: pointer;
  width: 10px;
  height: 10px;
`;

const Cover = styled.div`
  background: white;
  border-radius: 17px;
  padding: 10px;
  margin: 0px 10px;
  box-shadow: 0px 3px 6px #00000029;
`;

const HStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NumberHStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: -webkit-fill-available;
  justify-content: space-around;
`;

const TopHalf = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: -webkit-fill-available;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NumberVStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PickColorText = styled.div`
  font-size: 18px;
  color: #707070;
`;

const TextInput = styled.input`
  outline: none;
  padding: 20px 10px;
  border: 1px solid #dadce0;
  background: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  color: #707070;
  font-weight: light;
  border-radius: 17px;
  margin: 5px 0px;
  box-shadow: 0px 3px 6px #00000029;

  &:focus {
    border: 1px solid #00000030;
  }
`;

const NumberInput = styled.input`
  outline: none;
  padding: 10px 5px;
  border: 1px solid #dadce0;
  background: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  color: #707070;
  font-weight: light;
  border-radius: 17px;
  margin: 5px 0px;
  width: 30px;
  text-align: center;
  box-shadow: 0px 3px 6px #00000029;

  &:focus {
    border: 1px solid #00000030;
  }
`;
const BottomHalf = styled.div`
  margin: 10px;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: -webkit-fill-available;
`;
const DateText = styled.text`
  font-size: 16px;
  color: #707070;
  margin-bottom: 10px;
`;

const LabelText = styled.text`
  font-weight: 200;
  font-size: 14px;
  color: #707070;
`;

const ColonText = styled.text`
  font-size: 14px;
  color: #707070;
  margin: 0px 5px;
`;

const AMDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 17px;
  color: #707070;
  font-size: 14px;
  box-shadow: 0px 3px 6px #00000029;
`;

const PMDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 17px;
  color: #707070;
  font-size: 14px;
  box-shadow: 0px 3px 6px #00000029;
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

export default function AddStudyBubble(props) {
  const [selectedColor, setSelectedColor] = useState("");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("00");
  const [startPM, setStartPM] = useState(false);
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("00");
  const [endPM, setEndPM] = useState(true);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const handleChange = (color) => {
    setSelectedColor(color.hex);
    handleClose();
  };

  const updateTitle = (event) => {
    setTitle(event.target.value);
  };
  const updateLocation = (event) => {
    setLocation(event.target.value);
  };

  // TODO: Set up checks
  const updateStartHour = (event) => {
    const val = parseInt(event.target.value);
    setStartHour(event.target.value);
  };

  const updateEndHour = (event) => {
    const val = parseInt(event.target.value);
    setEndHour(event.target.value);
  };

  const updateStartMinute = (event) => {
    const val = parseInt(event.target.value);
    setStartMinute(event.target.value);
  };

  const updateEndMinute = (event) => {
    const val = parseInt(event.target.value);
    setEndMinute(event.target.value);
  };

  const submit = () => {
    if (
      selectedColor &&
      title &&
      location &&
      props.selectedDate &&
      startHour.length > 0 &&
      endHour.length > 0
    ) {
      var startTime = "";
      var endTime = "";

      if (startPM) {
        startTime = startHour + ":" + startMinute + " PM";
      } else {
        startTime = startHour + ":" + startMinute + " AM";
      }
      if (endPM) {
        endTime = endHour + ":" + endMinute + " PM";
      } else {
        endTime = endHour + ":" + endMinute + " AM";
      }

      
      addStudyBubble(
        selectedColor,
        title,
        location,
        format(props.selectedDate, "MMddyyyy"),
        startTime,
        endTime,
        "",
        0
      ).then((response) => props.refreshCallback(response["id"]));
    }
  };

  return (
    <>
      <Section1>
        <Section2 color={selectedColor}>
          <TopHalf>
            <VStack>
              <TextInput
                required
                type="text"
                placeholder="Title"
                id="title"
                value={title}
                onChange={updateTitle}
              />
              <TextInput
                required
                type="text"
                placeholder="Location"
                id="location"
                value={location}
                onChange={updateLocation}
              />
            </VStack>

            {displayColorPicker ? (
              <Cover onClick={handleClose}>
                <CirclePicker
                  width="126px"
                  colors={[
                    "#FFCBA8",
                    "#FFE8A8",
                    "#BAF8B7",
                    "#BEE9FF",
                    "#FFC4DA",
                    "#CBC6F7",
                    "#A9B5D9",
                    "#F2DFEB",
                    "#D1EBD8",
                  ]}
                  triangle="hide"
                  color={selectedColor}
                  onChange={handleChange}
                />
              </Cover>
            ) : (
              <SwatchDiv onClick={handleClick}>
                <ColorDiv color={selectedColor}></ColorDiv>
              </SwatchDiv>
            )}
          </TopHalf>
          <BottomHalf>
            <DateText>
              {format(props.selectedDate, "EEEE • MMMM dd, yyyy")}
            </DateText>
            <NumberHStack>
              <NumberVStack>
                <LabelText>Starts:</LabelText>
                <HStack>
                  <NumberInput
                    placeholder="HH"
                    id="startHour"
                    value={startHour}
                    onChange={updateStartHour}
                  />
                  <ColonText>:</ColonText>
                  <NumberInput
                    placeholder="MM"
                    id="startMinute"
                    value={startMinute}
                    onChange={updateStartMinute}
                  />
                </HStack>
                <Switch
                  checked={startPM}
                  onChange={() => setStartPM(!startPM)}
                  handleDiameter={30}
                  offColor="#74d9ff"
                  onColor="#35567D"
                  height={40}
                  width={100}
                  borderRadius={40}
                  uncheckedIcon={<div />}
                  checkedIcon={<div />}
                  uncheckedHandleIcon={<AMDiv>AM</AMDiv>}
                  checkedHandleIcon={<PMDiv>PM</PMDiv>}
                  id="small-radius-switch"
                />
              </NumberVStack>
              <NumberVStack>
                <LabelText>[Total Time]</LabelText>
              </NumberVStack>
              <NumberVStack>
                <LabelText>Ends:</LabelText>
                <HStack>
                  <NumberInput
                    placeholder="HH"
                    id="endHour"
                    width="20px"
                    value={endHour}
                    onChange={updateEndHour}
                  />
                  <ColonText>:</ColonText>
                  <NumberInput
                    placeholder="MM"
                    id="endMinute"
                    value={endMinute}
                    onChange={updateEndMinute}
                  />
                </HStack>
                <Switch
                  checked={endPM}
                  onChange={() => setEndPM(!endPM)}
                  handleDiameter={30}
                  offColor="#74d9ff"
                  onColor="#35567D"
                  height={40}
                  width={100}
                  borderRadius={40}
                  uncheckedIcon={<div />}
                  checkedIcon={<div />}
                  uncheckedHandleIcon={<AMDiv>AM</AMDiv>}
                  checkedHandleIcon={<PMDiv>PM</PMDiv>}
                  id="small-radius-switch"
                />
              </NumberVStack>
            </NumberHStack>
          </BottomHalf>
        </Section2>
      </Section1>
      <Button onClick={submit}>Add Study Bubble</Button>
    </>
  );
}
