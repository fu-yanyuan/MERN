import { useState } from "react"

const Auth = () => {
  const [loginMode, setLoginMode] = useState(false)
  const [error, setError] = useState(null)

  const setviewLogin = (status) => {
    setError(null)  // reset erros
    setLoginMode(status)
  }

  return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
              <h2>{loginMode ? 'Please Log in' : 'Please Sign up'}</h2>
              <input type="email" placeholder="template@test.com"/>
              <input type="password" placeholder="password"/>
              {!loginMode && <input type="password" placeholder="Please comfirm your passwrod"/>}
              <input type="submit" />
              {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button 
              onClick={() => setviewLogin(false)}
              style={{backgroundColor : !loginMode ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Sign Up</button>
            <button 
              onClick={() => setviewLogin(true)} 
              style={{backgroundColor : loginMode ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
            >Log In</button>
          </div>
        </div>
      </div>
  )
}
  
export default Auth
