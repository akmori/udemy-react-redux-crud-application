import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link} from 'react-router-dom'

// アクションクリエイターのインポート
import { readEvents } from '../actions'

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents() // 実装はアクション
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <tr key={event.id}>
        <td>{event.id}</td>
        <td>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render() {
    return (
      <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEvents()}
        </tbody>
      </table>
      <Link to="/events/new">New Events</Link>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({events: state.events})

const mapDispatchToProps = ({ readEvents })

// stateとactionをcomponentに紐づける
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
