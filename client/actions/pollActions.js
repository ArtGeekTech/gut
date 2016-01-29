import { routeActions } from 'react-router-redux';

export const SEND_POLL_REQUEST = 'SEND_POLL_REQUEST';
export const SEND_POLL_SUCCESS = 'SEND_POLL_SUCCESS';
export const SEND_POLL_ERROR = 'SEND_POLL_ERROR';
export const UPDATE_POLL = 'UPDATE_POLL';
export const SYNC_POLL = 'SYNC_POLL';
export const END_POLL = 'END_POLL';
export const LOAD_YELP_DATA = 'LOAD_YELP_DATA';

export const fetchYelpData = () => {
  return dispatch => {

    return fetch('http://localhost:5679/yelp?location=' + 'seattle', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('response in fetchyelp data', response);
      dispatch(loadYelpData(response));
    })
  }
}

const loadYelpData = (info) => {
  return {
    type: LOAD_YELP_DATA,
    info
  }
}

export const sendPollChoices = (choices) => {
  return dispatch => {
    dispatch(sendPollRequest(choices));

    return fetch('http://localhost:5679/preference', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: choices.username,
        selected: choices.selected,
        unselected: choices.unselected
      })
    })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('response:', response);
    })
  }
}

const sendPollRequest = (info) => {
  return {
    type: SEND_POLL_REQUEST,
    info
  }
}

const sendPollSuccess = (info) => {
  return {
    type: SEND_POLL_SUCCESS,
    info
  }
}

const sendPollError = (err) => {
  return {
    type: SEND_POLL_ERROR,
    err
  }
}

export const updatePoll = (info, username) => {
  let results = shortenPoll(info, username);
  return {
    type: UPDATE_POLL,
    results
  }
}

export const syncPoll = (info, username) => {
  return {
    type: SYNC_POLL,
    info,
    username
  }
}

const endPoll = (userInfo) => {
  return {
    type: END_POLL,
    userInfo
  }
}

export const shortenPoll = (info, username) => {
  let results = info;

  if (info.length > 2) {
    results = info.slice(2);
  } else {
    console.log('inside shortenpoll');
    return dispatch => {
      console.log('inside else of shorten poll');
      dispatch(routeActions.push('/profile'))
      dispatch(endPoll(username));
    }
  }
  return results;
}
