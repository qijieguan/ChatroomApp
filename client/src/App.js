import './App.css';
import Nav from './component/Nav.js';
import Home from './component/Home.js';
import Login from './component/Login.js';
import Register from './component/Register.js';
import Dashboard from './component/Dashboard.js';
import Create from './component/CreateRoom.js';
import Join from './component/JoinRoom.js';
import Page from './component/RoomPage.js';
import Expand from './component/TopicExpand.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/create" component={Create}></Route>
          <Route path="/join" component={Join}></Route>
          <Route path="/room/:id" exact component={Page}></Route>
          <Route path="/room/:id/topic/:id" exact component={Expand}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
