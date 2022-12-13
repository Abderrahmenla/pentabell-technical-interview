import React, { useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import "../assets/scss/style.scss";
import useApi from '../hooks/use-api'
import dataRequest from '../api/dataRequest'

const ResetedPassword = ({  history }) => {
  const [password, setPassword] = useState('')
  let {userID,token} = useParams();
  console.log(userID)
  const req = useApi(dataRequest);

  const submitHandler = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password})
  };
  try {
    const res = await req.request(`http://localhost:5000/api/password-reset/${userID}/${token}`,requestOptions);
  } catch (error) {
    console.error(error)
  }
    
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
                <h2 className="form-title">Reset Password</h2>
                <form onSubmit={submitHandler} className="register-form" id="login-form">
                    <div className="form-group">
                        <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                        <input 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password" 
                          name="your_pass" 
                          id="your_pass" 
                          placeholder="Password"/>
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

export default ResetedPassword
