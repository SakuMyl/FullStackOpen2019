import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'

const App = () => {

  const [blogs, setBlogs] = useState([]) 
  const [notification, setNotification]= useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <table>
        <tbody>
          <tr>
            <td>käyttäjätunnus:</td>
            <td>
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>salasana:</td>
            <td>
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit">kirjaudu</button>
    </form>      
  )

  const getNotification = () => {
    if(notification) {
      return (
        <Notification className='Notification' message={notification}/>
      )
    } else if(errorMessage) {
      return (
        <Notification className='Error' message={errorMessage}/>
      )
    } else {
      return undefined
    }
  }

  const handleErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const handleNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleErrorMessage('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  if(user === null) {
    return (
      <div>
        <h2>Log in</h2>
        
        {getNotification()}

        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>

      {getNotification()}

      <p>{user.name} logged in</p>

      <button onClick={handleLogout}>Log out</button>

      <CreateBlog 
        user={user}
        handleNewBlog={setBlogs} 
        setNotification={handleNotification} 
        setErrorMessage={handleErrorMessage}/>

      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default App