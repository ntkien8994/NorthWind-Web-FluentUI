import React from 'react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './App.css';
import {Router} from './routes/router';
import {initializeIcons} from '@fluentui/react';

function App() {
  initializeIcons()
  return (
    <div className="App">
      <Router/>
    </div>
  );
}

export default App;
