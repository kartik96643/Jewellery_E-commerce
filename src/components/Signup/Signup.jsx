import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

  const [uname, setUName] = useState("")
  const [uemail, setUEmail] = useState("")
  const [pass, setPass] = useState("")
  const [message, setMessage] = useState("")
  const [errmsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()
    const data = {
      userName: uname,
      email: uemail,
      password: pass,
    }
    console.log(data)
 
    try {
      const res = await axios.post('http://localhost:5000/user/signup', data)
      // console.log(res.success)
      if (res.data.success) {
        setMessage(res.data.message)
        setSuccess(res.data.success)
        setTimeout(() => {
          setMessage("")
          navigate('/user/signin')
        }, 2000);
      } else {
        setErrMsg(res.data.message)
        setTimeout(() => {
          setErrMsg("")
        }, 2000);

      }

    } catch (error) {
      if (error.response?.status === 409) {
      setErrMsg("User with this email already exists. Please login.");
    } else {
      setErrMsg(error.response?.data?.message || "Something went wrong!");
    }
      setSuccess(false);
      setUName("")
      setUEmail("")
      setPass("")
      setTimeout(() => {
        setErrMsg("")
      }, 2000);
    }

  }
  return (
    <>

      {message && <p className='text-center font-bold m-4 text-green-500'>{message}</p>}
      {errmsg && <p className='text-center font-bold m-4 text-red-500'>{errmsg}</p>}

      <form className="max-w-sm mx-auto mt-4" onSubmit={handleSubmit} >
        <div className="mb-5">
          <label htmlFor="username" className="block mb-2.5 text-sm  font-medium text-heading">Username</label>
          <input type="username" name='username' id="username" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" value={uname} onChange={(e) => setUName(e.target.value)} required />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
          <input type="email" id="email" name='email' value={uemail} onChange={(e) => setUEmail(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
          <input type="password" id="password" name='password' value={pass} onChange={(e) => setPass(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" required />
        </div>
        <button type="submit" className="text-white bg-blue-400 cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base rounded-xl text-sm px-4 py-2.5 focus:outline-none">Signup</button>
      </form>


    </>
  )
}

export default Signup
