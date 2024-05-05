import { Link } from "react-router-dom";
import './index.css'

const Login = (props) => {
  return (
    <>
      <h1>Login</h1>
      <div className='container'>
        <div></div>
        <h3>Username</h3>
        <input onChange={props.usernameMethod} name="Username"/>
        <div></div><div></div><div></div>
        <h3>Password</h3>
        <input onChange={props.passwordMethod} password="Password"/>
        <div></div><div></div>
      </div>
      <Link to='/' onClick={props.loginMethod}>Log In</Link>
    </>
  );
};

export default Login;
