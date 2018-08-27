import { READ_EVENTS } from "../actions"
import _ from 'lodash'

// count reducer
export default (state = {}, action) => {
  switch(action.type) {
    case READ_EVENTS:
      console.log(_.mapKeys(action.response.data, 'id'))
      return _.mapKeys(action.response.data, 'id')
    default:
      return state
  }
}
