import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import useApi from '../hooks/use-api'
import dataRequest from '../api/dataRequest'
import "../assets/scss/style.scss";

const Signup = ({  history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const req = useApi(dataRequest);
  
  useEffect(() => {
    if (userInfo) {
      history.push('/signin')
    }
  }, [history, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,password,firstName,lastName,phoneNumber })
    };
      const res = await req.request("http://localhost:5000/api/signup",requestOptions);
      setUserInfo(res)
    }
  }

  return ( 
    <section className="signup">
      {message && <Message>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form onSubmit={submitHandler} className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="firstName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  type="text" 
                                  name="firstName" 
                                  id="name" 
                                  placeholder="First Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input 
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  type="text" 
                                  name="name" 
                                  id="name" 
                                  placeholder="Last Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phoneNumber"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input 
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value)}
                                  type="text" 
                                  name="phoneNumber" 
                                  id="phoneNumber" 
                                  placeholder="Phone Number"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                <input 
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  type="email" 
                                  name="email" 
                                  id="email" 
                                  placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input 
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  type="password" 
                                  name="pass" 
                                  id="pass" 
                                  placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input 
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                  type="password" 
                                  name="re_pass" 
                                  id="re_pass" 
                                  placeholder="Confirm password"/>
                            </div>
                            
                            <div className="form-group form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                        <figure><img src="images/signup-image.jpg" alt="sing up"/></figure>
                        <Link to={'/signin'}>
                        I am already member
                        </Link>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Signup
