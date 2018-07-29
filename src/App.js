import React, { Component } from 'react';
import PropTypes from 'prop-types';

const App = () => {
  const profiles = [
    {
      name: "Taro",
      age: 10
    },
    {
      name: "Hanako",
      age: 5
    },
    {
      name: "NoName",
    }
  ]
  return (
    <div>
      {
        profiles.map((profile, i) => {
          return <User key={i} name={profile.name} age={profile.age} />
        })
      }
    </div>
  )
}

const User = (props) => {
  return <div>{props.name}, and {props.age}</div>
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}

export default App;
