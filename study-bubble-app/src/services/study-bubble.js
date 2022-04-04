import {apiGet, apiPost, apiDelete} from './api';

const STUDYBUBBLE_ENDPOINT = 'StudyBubbles';
const STUDYBUBBLE_ADD_ENDPOINT = 'StudyBubbles/add';
const STUDYBUBBLE_DATE = 'StudyBubbles/date';


function getAllStudyBubbles() {
  return apiGet(STUDYBUBBLE_ENDPOINT);
}

function getStudyBubble(id) {
  return apiGet(STUDYBUBBLE_ENDPOINT, id);
}

function addStudyBubble(color, title, location, date, starts, ends, summary, cardNum) {
  return apiPost(STUDYBUBBLE_ADD_ENDPOINT, null, {
    color, title, location, date, starts, ends, summary, card_num: cardNum
  }).then((response)=> response.body);
}

function getStudyBubbleWithDate(date){
  return apiGet(STUDYBUBBLE_DATE, date);
}

export {
  getAllStudyBubbles, 
  getStudyBubble, 
  addStudyBubble,
  getStudyBubbleWithDate
}