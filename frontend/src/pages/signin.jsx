import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import "../assets/scss/style.scss";
import useApi from '../hooks/use-api'
import dataRequest from '../api/dataRequest'

const Singin = ({  history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const req = useApi(dataRequest);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
      history.push(`/todos/${userInfo._id}`)
    }
  }, [history, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,password })
  };
    const res = await req.request("http://localhost:5000/api/signin",requestOptions);
    setUserInfo(res)
  }

  return (
    <section className="sign-in">
      {req.error && <Message variant='danger'>{req.error}</Message>}
      {req.loading && <Loader />}
    <div className="container">
        <div className="signin-content">
            <div className="signin-image">
                <figure><img src="images/signin-image.jpg" alt="sing up"/></figure>
                <Link to={'/signup'}>
                Create an account
                </Link>
            </div>

            <div className="signin-form">
                <h2 className="form-title">Sign in</h2>
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

export default Singin
