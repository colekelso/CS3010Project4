import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Registration from './Registration';
import Account from './Account';
import Login from './Login';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: '',
      password: ''
    }
  }

  logMeIn = async () => {
    this.setState({
      loggedIn: true
    })
    let username = this.state.username;
    let password = this.state.password;
    const response = await fetch("http://localhost:8080/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username': username, 'password': password}),
    });
    console.log(response);
  }

  logMeOut() {
    this.setState({
      loggedIn: false
    })
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  register = async () => {
    let username = this.state.username;
    let password = this.state.password;
    const response = await fetch("http://localhost:8080/registration", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username': username, 'password': password}),
    });
    console.log(response);
  }

  updateAccount = async () => {
    const response = await fetch("http://localhost:8080/account", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'method': 'Update Account'}),
    });
    console.log(response);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route page='/' element={
            <Layout loggedIn={this.state.loggedIn}
                    logoutMethod={this.logMeOut.bind(this)}/>
          }>
            <Route index element={
              <Home />
            } />
            <Route path='registration' element={
              <Registration registerMethod={this.register.bind(this)}
                            usernameMethod={this.usernameChange.bind(this)}
                            passwordMethod={this.passwordChange.bind(this)}/>
            }/>
            <Route path='account' element={
              <Account username={this.state.username}
                       password={this.state.password}
                       updateAccountMethod={this.updateAccount.bind(this)}/>
            }/>
            <Route path='login' element={
              <Login loggedIn={this.state.loggedIn}
                     loginMethod={this.logMeIn.bind(this)}
                     usernameMethod={this.usernameChange.bind(this)}
                     passwordMethod={this.passwordChange.bind(this)}/>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

