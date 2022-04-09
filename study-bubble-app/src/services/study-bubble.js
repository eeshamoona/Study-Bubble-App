import { apiGet, apiPost, apiDelete, apiPut } from "./api";

const STUDYBUBBLE_ENDPOINT = "StudyBubbles";
const STUDYBUBBLE_ADD_ENDPOINT = "StudyBubbles/add";
const STUDYBUBBLE_DATE = "StudyBubbles/date";
const STUDYBUBBLE_UPDATE = "StudyBubbles/update";

function getAllStudyBubbles() {
  return apiGet(STUDYBUBBLE_ENDPOINT);
}

function getStudyBubble(id) {
  return apiGet(STUDYBUBBLE_ENDPOINT, id);
}

function addStudyBubble(
  color,
  title,
  location,
  date,
  starts,
  ends,
  summary,
  cardNum
) {
  return apiPost(STUDYBUBBLE_ADD_ENDPOINT, null, {
    color,
    title,
    location,
    date,
    starts,
    ends,
    summary,
    card_num: cardNum,
  }).then((response) => response.body);
}

function getStudyBubbleWithDate(date) {
  return apiGet(STUDYBUBBLE_DATE, date);
}

function updateSummary(studyBubble, newSummary) {
  return apiPut(STUDYBUBBLE_UPDATE, null, {
    color: studyBubble["color"],
    title: studyBubble["title"],
    location: studyBubble["location"],
    date: studyBubble["date"],
    starts: studyBubble["starts"],
    ends: studyBubble["ends"],
    summary: newSummary,
    card_num: studyBubble["card_num"],
    id: studyBubble["id"],
  });
}

export {
  getAllStudyBubbles,
  getStudyBubble,
  addStudyBubble,
  getStudyBubbleWithDate,
  updateSummary
};
