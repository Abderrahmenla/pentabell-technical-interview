import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import "../assets/scss/style.scss";
import useApi from '../hooks/use-api'
import dataRequest from '../api/dataRequest'

const ResetedPassword = ({  history }) => {
  const [email, setEmail] = useState('')
  const req = useApi(dataRequest);
  let token;
  let userId;
  let password;

  const changePassword = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password})
  };
  try {
    const res = await req.request(`http://localhost:5000/api/password-reset/${userId}/${token}`,requestOptions);
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
                <h2 className="form-title"> Password Changed</h2>
            </div>
        </div>
    </div>
</section>
  )
}

export default ResetedPassword
