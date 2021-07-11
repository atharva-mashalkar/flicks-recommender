import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Dashboard from "./components/Dashboard";

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
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
