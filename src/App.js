
import Navbar from './Navbar';
import Inventory from './Inventory';
import About from './About';
import Login from './Login';
import Loadouts from './Loadouts';

import CL from './createLoadout';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Profile from './Profile';
function App() {
  const userName="omniubs"
  return (
    <Router>
    <div className="App">
    
      <div className="content">
        <Switch>
        <Route exact path="/">
          <Login/>
          </Route>
          <Route exact path="/loadouts/:id">
            <Navbar/>
            <Loadouts/>
          </Route>
          <Route exact path="/inventory/:id">
          <Navbar/>
            <Inventory/>
          </Route>
          <Route exact path="/about">
            <Navbar/>
            <About/>
          </Route>
          <Route exact path="/create_loadout/:id">
            <Navbar/>
            <CL/>
          </Route>
          <Route exact path="/profile/:id">
          <Navbar/>
            <Profile/>
          </Route>
          
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
