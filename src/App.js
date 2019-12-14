import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './Shared/History'
import Grid from '@material-ui/core/Grid';
import './App.css';

import MainScreen from './Components/Screens/Main/Main'

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Grid
          container
          className="App"
          direction="column"
        >
          <Route path="/" exact component={MainScreen} />
        </Grid>
      </Router>
    );
  }
}

export default App;
