import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// アクションクリエイターのインポート
import { readEvents } from '../actions'

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents() // 実装はアクション
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableCell>{event.id}</TableCell>
        <TableCell>
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </TableCell>
        <TableCell>{event.body}</TableCell>
      </TableRow>
    ))
  }

  render() {
    return (
      <React.Fragment>
        <Button variant="fab" color="primary" aria-label="Add" component={Link} to="/events/new" style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
          <AddIcon />
        </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Body</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {this.renderEvents()}
        </tbody>
      </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({events: state.events})

const mapDispatchToProps = ({ readEvents })

// stateとactionをcomponentに紐づける
export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex);
