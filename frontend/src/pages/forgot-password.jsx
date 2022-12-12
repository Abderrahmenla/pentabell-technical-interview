import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import "../assets/scss/style.scss";
import useApi from '../hooks/use-api'
import dataRequest from '../api/dataRequest'

const ForgotPassword = ({  history }) => {
  const [email, setEmail] = useState('')
  const req = useApi(dataRequest);

  const submitHandler = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email})
  };
    const res = await req.request("http://localhost:5000/api/password-reset",requestOptions);
    console.log(res)
  }

  return (
    <section className="sign-in">
      {req.error && <Message variant='danger'>{req.error}</Message>}
      {req.loading && <Loader />}
    <div className="container">
        <div className="signin-content">
            <div className="signin-image">
                <figure><img src="images/signin-image.jpg" alt="sing up"/></figure>
                <Link to={'/signin'}>
                  Sign in
                </Link>
            </div>

            <div className="signin-form">
                <h2 className="form-title"> Reset password</h2>
                <form onSubmit={submitHandler} className="register-form" id="login-form">
                    <div className="form-group">
                        <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                        <input 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email" 
                          name="email" 
                          id="email" 
                          placeholder="Email"/>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signin" id="signin" className="form-submit" value="Log in"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
  )
}

export default ForgotPassword
