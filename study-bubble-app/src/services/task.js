import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const TASK_ENDPOINT = "Tasks";
const TASK_ADD_ENDPOINT = "Tasks/add";
const TASK_ALL_ENDPOINT = "Tasks/all";
const TASK_UPDATE_ENDPOINT = "Tasks/update";

function getAllTasks() {
  return apiGet(TASK_ENDPOINT);
}

function getTask(id) {
  return apiGet(TASK_ENDPOINT, id);
}

function getTasksFromStudyBubble(StudyBubbleId) {
  return apiGet(TASK_ALL_ENDPOINT, StudyBubbleId);
}

function addTask(text, isChecked, studyBubbleId) {
  return apiPost(TASK_ADD_ENDPOINT, null, {
    text,
    is_checked: isChecked,
    study_bubble_id: studyBubbleId,
  }).then((response) => response.body);
}

function updateTask(text, isChecked, studyBubbleId, taskId) {
  return apiPut(TASK_UPDATE_ENDPOINT, null, {
    text,
    is_checked: isChecked,
    study_bubble_id: studyBubbleId,
    id: taskId,
  });
}

export {
  getAllTasks,
  getTask,
  addTask,
  getTasksFromStudyBubble,
  updateTask,
};
