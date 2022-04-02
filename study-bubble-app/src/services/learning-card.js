import { apiGet, apiPost, apiDelete } from "./api";

const LEARNINGCARD_ENDPOINT = "LCards";
const LEARNINGCARD_ADD_ENDPOINT = "LCards/add";
const LEARNINGCARD_ALL_ENDPOINT = "LCards/all";

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

export { getAllLCards, getLCard, addLCard, getLCardsFromStudyBubble };
