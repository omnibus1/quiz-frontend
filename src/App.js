


import Home from './Home';
import Quiz from './QuizRender';



import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  
  return (
    <Router>
    <div className="App">
    
      <div className="content">
        <Switch>
        <Route exact path="/">
          <Home/>
          </Route>          
        </Switch>
        <Switch>
        <Route exact path="/quiz/:id">
          <Quiz/>
          </Route>          
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
