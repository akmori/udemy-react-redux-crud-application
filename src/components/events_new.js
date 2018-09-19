import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { postEvent } from '../actions'

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
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

  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props // handleSubmitはredux-form独自の関数？
    const style = {margin: 12}

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

const mapDispatchToProps = ({ postEvent })

// stateとactionをcomponentに紐づける
export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm'})(EventsNew)
);
