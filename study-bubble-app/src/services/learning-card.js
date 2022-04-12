import { apiGet, apiPost, apiPut, apiDelete } from "./api";

const LEARNINGCARD_ENDPOINT = "LCards";
const LEARNINGCARD_ADD_ENDPOINT = "LCards/add";
const LEARNINGCARD_ALL_ENDPOINT = "LCards/all";
const LEARNINGCARD_UPDATE_ENDPOINT = "LCards/update";

function getAllLCards() {
  return apiGet(LEARNINGCARD_ENDPOINT);
}

function getLCard(id) {
  return apiGet(LEARNINGCARD_ENDPOINT, id);
}

function getLCardsFromStudyBubble(StudyBubbleId) {
  return apiGet(LEARNINGCARD_ALL_ENDPOINT, StudyBubbleId);
}

function addLCard(front, back, studyBubbleId) {
  return apiPost(LEARNINGCARD_ADD_ENDPOINT, null, {
    front,
    back,
    study_bubble_id: studyBubbleId,
  }).then((response) => response.body);
}

function updateLCard(front, back, studyBubbleId, cardId) {
  return apiPut(LEARNINGCARD_UPDATE_ENDPOINT, null, {
    front, 
    back,
    study_bubble_id: studyBubbleId,
    id: cardId
  })
}

export { getAllLCards, getLCard, addLCard, getLCardsFromStudyBubble, updateLCard };
