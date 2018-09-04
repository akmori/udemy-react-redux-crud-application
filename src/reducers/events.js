import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT
} from "../actions";
import _ from "lodash";

// count reducer
export default (events = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response.data;
      return { ...events, [data.id]: data };
    // {id: 10, title: "Let's have an event 10!", body: "This is the body for event 10."}body: "This is the body for event 10."id: 10title: "Let's have an event 10!"__proto__: Object
    case READ_EVENTS:
      return _.mapKeys(action.response.data, "id");
    case DELETE_EVENT:
      delete events[action.id];
      return { ...events }; //新しいメモリに展開
    default:
      return events;
  }
};
