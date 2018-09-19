import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    console.log(id)
    if ( id ) this.props.getEvent(id)
  }

  renderfield(field) {
    const { input, label, type, meta: { touched, error } } = field;

    return (
      <TextField
        label={label}
        placeholder={label}
        type={type}
        error={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params;
    console.log(id)
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.putEvent(values);
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props // handleSubmitはredux-form独自の関数？
    const style = { margin: 12 }
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderfield} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderfield} /></div>
        <Button variant="raised" color="primary" style={style} type="submit" disabled={pristine || submitting || invalid}>
          Submit
        </Button>
        <Button variant="raised" color="secondary" style={style} href="/">
          Cancel
        </Button>
        <Button variant="raised" color="inherit" style={style} onClick={this.onDeleteClick}>
          Delete
        </Button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if(!values.title) errors.title = "Enter a title ,please"
  if(!values.body) errors.body = "Enter a body ,please"

  return errors;
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

// stateとactionをcomponentに紐づける
export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true})(EventsShow)
);
