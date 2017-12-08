import history from '../routers/history';
// ADD_EVENT
// TODO: google maps

export const requestAddEvent = (
  {
    name = '',
    date=0,
    loc=''
  } = {}) => (
    {
    type: 'ADD_EVENT',
    isFetching: true,
    event: {
      name,
      date,
      loc
    }
});

export const receiveAddEvent = ({name, _id, date, address, placeId}) =>({
  type: 'ADD_EVENT_SUCCESS',
  id: _id,
  date, name,
  address, placeId
})

export const addEventError = (message) => ({
  type: 'ADD_EVENT_FAILURE',
  isFetching: false,
  message
})

// REMOVE_EVENT
export const removeEvent = ({ id }) => ({
  type: 'REMOVE_EVENT',
  id
});

// EDIT_EVENT
export const editEvent = (id, updates) => ({
  type: 'EDIT_EVENT',
  id,
  updates
})

// GET EVENTS
export const requestGetEvents = () => ({
  type: 'REQUEST_GET_EVENTS',
})

export const receiveGetEvents = (events) => ({
  type: 'GET_EVENTS_SUCCESS',
  events
})

export const getEventsError = (message) => ({
  type: 'GET_EVENTS_FAILURE',
  message
})

export function getEvents() {
  console.log("fetching events from database...");
  let config = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' }
  }

  return dispatch => {
    console.log(dispatch(requestGetEvents()));

    return fetch('http://localhost:8000/events', config).then((res) => {
      if (res.status != 200) {
        dispatch(getEventsError("Error: Could not fetch events from database: " + res.statusText));
        return Promise.reject("Could not fetch events from database");
      }
      return res.json();
    }).then((json) => {
      console.log(dispatch(receiveGetEvents(json)));
    }).catch(err => console.log("Error: " + err));
  }
}

export function addEvent(event) {
  console.log("attempting to add event...")
  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded' },
    body: `name=${event.name}&date=${event.date}&placeId=${event.placeId}&address=${event.address}`
  }

  return dispatch => {
    dispatch(requestAddEvent(event));
    console.log("requested add event")

    return fetch('http://localhost:8000/events/new', config).then((res) => {
      if (res.status != 200) {
        dispatch(addEventError(res.statusText));
        return Promise.reject("Could not add event");
      }
      return res.json();
    }).then(({_id, name, date, address, placeId}) => {
      console.log(dispatch(receiveAddEvent({_id, name, address, placeId, date})))
      history.push(`/events/${_id}`);
    }).catch(err => console.log("Error: " + err));
  }

}
