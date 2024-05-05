import React from "react"
import { Outlet, Link } from "react-router-dom";
import './index.css'

export default function Layout(props) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link className='hlink' to='/'>Home</Link>
          </li>
          {!props.loggedIn &&
            <>
            <li>
              <Link className='hlink' to='/registration'>Registration</Link>
            </li>
            <li>
              <Link className='hlink' to='/login'>Login</Link>
            </li>
            </>
          }
          {props.loggedIn &&
            <>
            <li>
              <Link className='hlink' to='/account'>Account</Link>
            </li>
            <li>
              <Link className='hlink' to='/' onClick={props.logoutMethod}>Logout</Link>
            </li>
            </>
          }
        </ul>
      </nav>

      <Outlet />

      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

      <footer class="w3-container w3-padding-64 w3-center w3-opacity w3-light-grey w3-xlarge">
        <a href="https://www.facebook.com" target="_blank" class="fa fa-facebook-official w3-hover-opacity"></a>
        <a href="https://www.instagram.com" target="_blank" class="fa fa-instagram w3-hover-opacity"></a>
        <a href="https://www.snapchat.com" target="_blank" class="fa fa-snapchat w3-hover-opacity"></a>
        <a href="https://www.pinterest.com" target="_blank" class="fa fa-pinterest-p w3-hover-opacity"></a>
        <a href="https://www.x.com" target="_blank" class="fa fa-twitter w3-hover-opacity"></a>
        <a href="https://www.linkedin.com" target="_blank" class="fa fa-linkedin w3-hover-opacity"></a>
      </footer>
    </>
  );
}
