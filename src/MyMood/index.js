import React from 'react';
import Mood from '../Mood'
import AddToday from '../AddToday'

const MyMood = function (props) {
  //console.log(props.user)
  return (
    props.user ?
      <div><Mood userId = {props.user.id}/> <AddToday userId = {props.user.id} /></div>:
      <span>Loading</span>
  )
}

export default MyMood;
