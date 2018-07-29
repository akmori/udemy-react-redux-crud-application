import React, { Component } from 'react';

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
      name: "NoName"
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

User.defaultProps = {
  age: 1
}

export default App;
