import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import Spinner from '../../_components/Spinner'

function AdminLogin() {

  const [showSpinner, setShowSpinner] = useState(false)
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(true)

  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(true)

  const [loginErr, setLoginErr] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.auth)

  const submitHandler = async (e) => {
    e.preventDefault()
    setShowSpinner(true)
    try {
      if (email && password) {
        setEmailValid(true)
        setPasswordValid(true)
        const body = { email, password }
        let response = await axios.post(`/api/admin/auth`, body)
        dispatch(setCredentials({ ...response.data }))
        setShowSpinner(false)
        if (response.data.isAdmin) navigate('/admin')
      } else {
        setShowSpinner(false)
        if (email.trim() === '')
          setEmailValid(false)
        if (password.trim() === '')
          setPasswordValid(false)
      }
    } catch (error) {
      setShowSpinner(false)
      setLoginErr(error.response.data.err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="w-fit md:w-1/4 mx-auto p-4 bg-white rounded shadow-xl border-solid border-2 border-primary">
        <img src="/assets/logo.png" alt="Logo" className="w-16 mx-auto mb-4" />
        <h1 className='mb-5 font-bold text-red-800'>Admin Login</h1>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailValid(true)
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {!emailValid && <p className='text-red-600 text-sm'>Invalid Email</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPasswordValid(true)
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            {!passwordValid && <p className='text-red-600 text-sm'>Invalid Password</p>}
          </div>
          {showSpinner ?

            <div className='w-full text-center'>
              <Spinner />
            </div> :
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-600"
            >
              Sign In
            </button>

          }
          {loginErr && <div className='w-full text-center'><p className='text-red-600 text-sm'>{loginErr}</p></div>}
        </form>
      </div>
    </div>
  )
}

export default AdminLogin