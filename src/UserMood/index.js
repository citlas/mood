import React from 'react';
import Mood from '../Mood'

const UserMood = function (props) {
  return (
      <Mood userId = {props.match.params.user}/>
  )
}

export default UserMood;
