import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
// this also works with react-router-native

const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/add-today/:user') }}
  >
    Add today!
  </button>
))

export default withRouter(Button);