import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/navbar.component.js';
import ExercisesList from './components/exercises-list.component.js';
import EditExercise from './components/edit-exercise.component.js';
import CreateExercise from './components/create-exercise.component.js';
import CreateUser from './components/create-user.component.js';

function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/" exact component={EditExercise} />
      <Route path="/" exact component={CreateExercise} />
      <Route path="/" exact component={CreateUser} />
    </div>
  </Router>
  );
}

export default App;
