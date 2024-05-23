import { useState } from "react"
import { useCookies } from 'react-cookie'
 
const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const [loginMode, setLoginMode] = useState(false)
  const [error, setError] = useState(null)

  // login or signup input
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmpwd, setConfirmpwd] = useState(null)
//   console.log(password)

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    
    // confirm pwd for sign up
    if (!loginMode && password != confirmpwd) {
        setError('Please confirm your password again')
        return
    }

    try {
          console.log('=========')
          console.log(email, password)
          const response = await fetch(`http://localhost:8000/${endpoint}`, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password})
        })
        // const data = await response.json()
        console.log(response.status)
        if (response.status == 409) {
            const data = await response.json()
            setError(data.errMsg)
        } else if (response.status == 200) {
            const data = await response.json()
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)

            window.location.reload()
        } else if (response.status == 401) {
            const data = await response.json()
            setError(data.errMsg)
        }else {
            setError(response.status.toString())
        }

      } catch (err) {
        console.log(err)
      }
  }



  const setviewLogin = (status) => {
    setError(null)  // reset erros
    setLoginMode(status)
  }

  return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
              <h2>{loginMode ? 'Please Log in' : 'Please Sign up'}</h2>
              <input 
                type="email" 
                placeholder="template@test.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {!loginMode && <input 
                type="password" 
                placeholder="Please comfirm your passwrod"
                onChange={(e) => setConfirmpwd(e.target.value)}
              />}
              <input 
                type="submit" 
                onClick={(e) => handleSubmit(e, loginMode ? 'login' : 'signup')}
              />
              {error && <p style={{color : 'rgb(255, 0, 0)'}}>{error}</p>}
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
