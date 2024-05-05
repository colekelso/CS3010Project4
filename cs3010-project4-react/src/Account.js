import { Link } from "react-router-dom";
import './index.css';

const Account = (props) => {
  return (
    <>
      <h1>Account</h1>
      <div className='container'>
        <div></div>
        <h3>Username:</h3>
        <h4>{props.username}</h4>
        <div></div><div></div><div></div>
        <h3>Password:</h3>
        <h4>{props.password}</h4>
        <div></div><div></div>
        <div></div><div></div>
        <Link to='/' onClick={props.updateAccountMethod}>Update Account</Link>
      </div>
    </>
  );
};

export default Account;
