import { createAction } from "redux-actions";

export const INITIALIZE_DATA = "INITIALIZE_DATA";
export const REQUEST_DETECTION = "REQUEST_DETECTION";
export const REQUEST_TRANSCRIPTION = "REQUEST_TRANSCRIPTION";
export const FETCH_RESULTS = "FETCH_RESULTS";
export const FETCHING_RESULTS = "FETCHING_RESULTS";
export const RECEIVE_DETECTION_RESULTS = "RECEIVE_DETECTION_RESULTS";
export const RECEIVE_TRANSCRIPTION_RESULTS = "RECEIVE_TRANSCRIPTION_RESULTS";
export const CHECK_FIGURE_NUM = "CHECK_FIGURE_NUM";
export const CHANGE_DETECTION_TAG = "CHANGE_DETECTION_TAG";
export const CHECK_DETECTION_TAG = "CHECK_DETECTION_TAG";

export const initializeData = createAction(INITIALIZE_DATA, data => {
  return {
    data
  };
});
export const requestDetection = createAction(REQUEST_DETECTION, (url, index) => {
  return {
    url,
    index
  };
});
export const requestTranscription = createAction(REQUEST_TRANSCRIPTION, (url, index) => {
  return {
    url,
    index
  };
});
export const fetchResults = createAction(FETCH_RESULTS, url => {
  return {
    url
  };
});
export const fetchingResults = createAction(FETCHING_RESULTS);
export const receiveDetectionResults = createAction(RECEIVE_DETECTION_RESULTS, (data, index) => {
  return {
    data,
    index
  };
});
export const receiveTranscriptionResults = createAction(RECEIVE_TRANSCRIPTION_RESULTS, (data, index) => {
  return {
    data,
    index
  };
});
export const checkFigureNum = createAction(CHECK_FIGURE_NUM, index => {
  return {
    index
  };
});
export const changeDetectionTag = createAction(CHANGE_DETECTION_TAG, (input, figureIndex, index, mode) => {
  return {
    input,
    figureIndex,
    index,
    mode
  };
});
export const checkDetectionTag = createAction(CHECK_DETECTION_TAG, (checked, figureIndex, tagIndex) => {
  return {
    checked,
    figureIndex,
    tagIndex
  };
});
