import React from 'react';
import Mood from '../Mood'
import AddToday from '../AddToday'
import Basic from '../fileUpload/Basic'

const MyMood = function (props) {
  //console.log(props.user)
  return (
    props.user ?
      <div>
        <h2>My mood</h2>
        <Mood userId = {props.user.id}/> 
        <AddToday userId = {props.user.id} />
        <Basic userId = {props.user.id}/>
      </div>:
      <span>Loading</span>
  )
}

export default MyMood;
