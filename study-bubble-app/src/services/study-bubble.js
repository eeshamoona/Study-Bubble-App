import {apiGet, apiPost, apiDelete} from './api';

const STUDYBUBBLE_ENDPOINT = 'StudyBubbles';
const STUDYBUBBLE_ADD_ENDPOINT = 'StudyBubbles/add';


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


export {
  getAllStudyBubbles, 
  getStudyBubble, 
  addStudyBubble
}