import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { postEvent } from '../actions'

class EventsNew extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
  }

  renderfield(field) {
    const { input, label, type, meta: { touched, error } } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  async onSubmit(values) {
    await this.props.postEvent(values);
    this.props.history.push('/')
  }

  render() {
    console.log(this.props)
    const { handleSubmit, pristine, submitting } = this.props // handleSubmitはredux-form独自の関数？
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={this.renderfield} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderfield} /></div>
        <div>
          <input type="submit" value="submit" disabled={pristine || submitting} />
          <Link to="/">Cancel</Link>
        </div>
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
