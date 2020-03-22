import React from 'react';
import './App.css';
import Form from './components/Form';
import List from './components/List';
import { Grid } from '@material-ui/core';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Form/>
          </Grid>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
        
      </header>
    </div>
  );
}

export default App;
