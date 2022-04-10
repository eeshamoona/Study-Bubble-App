import React, { useState } from "react";
import styled from "styled-components";
import { TwitterPicker } from "react-color";

const Section1 = styled.section`
  background: transparent;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Section2 = styled.section`
  color: #f6f5fc;
  background: ${(props) => props.color};
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px #00000029;
  height: 270px;
  padding: 20px;
`;

const SwatchDiv = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: inline-block;
  cursor: pointer;
  width: fit-content;
`;

const Color = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
  background: ${(props) => props.color};
`;

const Popover = styled.div`
  position: absolute;
  z-index: 2;
`;

const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
const HStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const VStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PickColorText = styled.div`
  font-size: 18px;
  color: #707070;
`;

export default function AddStudyBubble() {
  const [selectedColor, setSelectedColor] = useState("");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const updateSelectedColor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  const handleChange = (color) => {
    setSelectedColor(color.rgb);
  };
  return (
    <Section1>
      <Section2
        color={`rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`}
      >
        <VStack>
          <SwatchDiv onClick={handleClick}>
            <Color
              color={`rgb(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b})`}
            ></Color>
          </SwatchDiv>
          <PickColorText>Pick a Color </PickColorText>
        </VStack>
      </Section2>
      {displayColorPicker ? (
        <Popover>
          <Cover onClick={handleClose}></Cover>
          <TwitterPicker color={selectedColor} onChange={handleChange} />
        </Popover>
      ) : null}
    </Section1>
  );
}
