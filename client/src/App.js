import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Dashboard from "./components/Dashboard";

// import HookCounter from './components/HookCounter';
// import ClassCounter from './components/ClassCounter';
// import ToggleDisplay from './components/ToggleDisplay';

function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter>
        <Switch>
          <Route 
            exact 
            path="/" 
            component={HomePage} 
          />
          <Route 
            exact 
            path="/signup" 
            component={Signup} 
          />
          <Route
            exact 
            path="/dashboard"
            component={Dashboard}
          />
          {/* <Route exact path = "/" component = {ToggleDisplay}/> */}
          {/* <Route exact path="/" component={HookCounter}/> */}
          {/* <Route exact path="/" component={ClassCounter}/> */}
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
