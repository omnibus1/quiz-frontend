
import Navbar from './Navbar';
import Inventory from './Inventory';
import Home from './Home';
import Login from './Login';
import Loadouts from './Loadouts';
import UserDetail from './UserDetail';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
function App() {
  const userName="omniubs"
  return (
    <Router>
    <div className="App">
    <Navbar/>
      <div className="content">
        <Switch>
        <Route exact path="/">
          
            <Home/>
          </Route>
          <Route exact path="/loadouts">
          
            <Loadouts/>
          </Route>
          <Route exact path="/inventory/:id">
            
            <Inventory/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/inventory2/:id" >
            <UserDetail/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
