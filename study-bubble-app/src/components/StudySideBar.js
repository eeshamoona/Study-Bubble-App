import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addTask, updateTask, getTasksFromStudyBubble } from "../services/task";

const Section1 = styled.section`
  background: transparent;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const Section2 = styled.section`
  align-items: center;
  background: ${(props) => props.color};
  border-radius: 17px;
  align-self: center;
  margin-left: 25px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  padding: 0px 30px;
  justify-content: space-evenly;
  width: max-content;
  box-shadow: 0px 3px 6px #00000029;
`;

const Section3 = styled.div`
  padding: 30px 0px;
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
`;

const Section4 = styled.div`
  padding: 30px 0px;
  align-items: center;
  background: transparent;
  display: flex;
  margin-left: 25px;
  flex-direction: column;
  height: -webkit-fill-available;
`;

const Section5 = styled.div`
  padding: 30px 0px;
  align-items: center;
  background: transparent;
  display: flex;
  margin-left: 25px;
  flex-direction: column;
  height: -webkit-fill-available;
  max-width: 186px;
`;
const Section6 = styled.div`
  resize: none;
  overflow: hidden;
  text-align: left;
  margin: 10px 0px 15px 0px;
  padding: 15px;
  width: -webkit-fill-available;
  border: none;
  border-radius: 17px;
  height: -webkit-fill-available;
  box-shadow: 0px 3px 6px #00000029;
  background: ${(props) => props.color};
`;

const Section7 = styled.div`
  border-radius: 17px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 186px;
`;

const Button = styled.button`
  background: ${(props) => props.color};
  color: #707070;
  border-radius: 50px;
  width: -webkit-fill-available;
  height: 40px;
  font-size: 24px;
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;
`;

const TitleText = styled.text`
  font-size: 40px;
`;

const SubText = styled.text`
  font-size: 18px;
`;

const SubText2 = styled.text`
  font-size: 24px;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  overflow: hidden;
  text-align: left;
  margin: 10px 0px 15px 0px;
  padding: 5px;
  width: -webkit-fill-available;
  border: none;
  border-radius: 17px;
  height: -webkit-fill-available;
  box-shadow: 0px 3px 6px #00000029;
`;

const InputText = styled.textarea`
  border-radius: 17px;
  border: none;
  box-shadow: 0px 3px 6px #00000029;
  padding: 10px;
  height: 20px;
  width: 50%;
  overflow-y: scroll;
  resize: none;
  flex: auto;
  background: ${(props) => props.color};
`;

const TaskItemBox = styled.input`
  margin: 0px 10px 0px !important;
  cursor: pointer;
`;
const TaskItemLabel = styled.label`
  cursor: pointer;
  display: block;
  font-weight: normal;
  font-size: 14px;
  padding: 5px 0px;
`;

const EnterButton = styled.button`
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  background: ${(props) => props.color};
  filter: brightness(120%);
  width: 30px;
  height: 30px;
  margin-left: 10px;
  box-shadow: 0px 3px 6px #00000029;
  font-size: 10px;
`;

export default function StudySideBar(props) {
  const [notesText, setNotesText] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [showTodo, setShowTodo] = useState(false);
  const [value, setValue] = useState("");
  const [taskItems, setTaskItems] = useState([]);

  const updateNotesText = (event) => {
    setNotesText(event.target.value);
  };

  const eraseNotes = (event) => {
    setNotesText("");
  };
  const updateValue = (event) => {
    setValue(event.target.value);
  };

  const switchFunction = () => {
    setShowTodo(!showTodo);
  };

  const checkedBox = (task, index) => {
    updateTask(
      task["text"],
      !task["is_checked"],
      task["study_bubble_id"],
      task["id"]
    ).then((response) => {
      var newTasks = [...taskItems];
      response.body.then((val) => {
        newTasks[index] = val;
      });
      setTaskItems(newTasks);
    });
  };

  const addTaskItem = () => {
    addTask(value, 0, props.studyBubble["id"]).then((response) => {
      var newTasks = [...taskItems];
      newTasks.push(response);
      console.log(newTasks);
      setTaskItems([...taskItems, response]);
      setValue("");
    });
  };

  useEffect(() => {
    if (props.studyBubble) {
      setCardNum(props.studyBubble["card_num"]);
      getTasksFromStudyBubble(props.studyBubble["id"]).then((response) => {
        setTaskItems(response);
      });
    }
  }, [props.refresh, taskItems, props.studyBubble]);

  return (
    <Section1>
      <Section2 onClick={switchFunction} color={props.studyBubble["color"]}>
        <Section3>
          <TitleText>{cardNum}</TitleText>
          <SubText>Learning Cards</SubText>
        </Section3>
        <Section3>
          <TitleText>32</TitleText>
          <SubText>Minutes Left</SubText>
        </Section3>
      </Section2>
      {showTodo ? (
        <Section5>
          <SubText2>Task List:</SubText2>
          <Section6 color={props.studyBubble["color"]}>
            {taskItems.map((task, i) => {
              return (
                <TaskItemLabel>
                  <TaskItemBox
                    type="checkbox"
                    checked={task["is_checked"]}
                    onChange={() => checkedBox(task, i)}
                  />
                  {task["text"]}
                </TaskItemLabel>
              );
            })}
          </Section6>
          <Section7>
            <InputText
              placeholder="Enter task..."
              value={value}
              onChange={updateValue}
            >
              Placeholder
            </InputText>
            <EnterButton
              onClick={addTaskItem}
              color={props.studyBubble["color"]}
            >
              &#10548;
            </EnterButton>
          </Section7>
        </Section5>
      ) : (
        <Section4>
          <SubText2>Notes:</SubText2>
          <StyledTextarea
            type="textarea"
            value={notesText}
            onChange={updateNotesText}
          ></StyledTextarea>
          <Button color={props.studyBubble["color"]} onClick={eraseNotes}>
            Clear
          </Button>
        </Section4>
      )}
    </Section1>
  );
}
