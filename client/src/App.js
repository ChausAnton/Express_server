import React from 'react';
import 'materialize-css';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./routes"


function App() {
  const routes = useRoutes(false)
  return (
    <Router>
      <div className="container">
        <h1>{routes}</h1>
      </div>
    </Router>
  );
}

export default App;
