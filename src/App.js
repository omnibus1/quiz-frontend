

import Login from './Login';
import Quiz from './Quiz';



import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

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
        </Switch>
        <Switch>
        <Route exact path="/quiz">
          <Quiz/>
          </Route>          
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
