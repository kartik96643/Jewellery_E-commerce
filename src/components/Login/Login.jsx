import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess, logout } from '../../Slices/authSlice'
import { clearCart } from '../../Slices/CartSlice'
import { toast } from 'react-toastify'

function Login() {

    const [uemail, setUEmail] = useState("")
    const [pass, setPass] = useState("")
    // const [message, setMessage] = useState("")
    // const [errmsg, setErrMsg] = useState("")
    // const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        e.preventDefault()
        const data = {
            email: uemail,
            password: pass
        }
        try {
            const res = await axios.post('http://localhost:5000/user/signin', data,{
                withCredentials:true,
            })
            if (res?.data?.success) {
                console.log(res.data)
                const token = res?.data?.token
                const userWithoutPass = res?.data?.userWithoutPass
                const data = res?.data
                if (token) {
                    localStorage.setItem('token', token)
                    console.log("token"+token+"and userwP"+userWithoutPass._id)
                    // setMessage(res?.data?.message)
                    toast.success(res?.data?.message)
                    localStorage.setItem('userId',userWithoutPass._id)
                    // setSuccess(res?.data?.success)
                    dispatch(clearCart())
                    dispatch(loginSuccess(data))
                    setTimeout(() => {
                        // setMessage("")
                        // setSuccess(null)
                        navigate('/')
                    }, 2000);

                }else{
                    navigate('/user/signin')
                }
                
            } else {
                // setErrMsg(res?.data?.message)
                // setSuccess(false)
                // setTimeout(() => {
                //     setErrMsg("")
                // }, 2000);
                toast.error(res?.data?.message)
            }

        } catch (error) {
            if (error?.response?.status === 404) {
                // setErrMsg(error?.response?.message || "Something went wrong. Please try again later.")
                toast.error(error?.response?.message || "Something went wrong. Please try again later.")
                // setSuccess(false)
            } else {
                setErrMsg("Internal Server Error!")
                toast.error("Internal Server Error!")
                // setSuccess(false)
            }
            // setUEmail("")
            // setPass("")
            // setTimeout(() => {
            //     setErrMsg("")
            // }, 2000);
        }


    }

    return (
        <>
            <h4 className='mt-4 text-center font-bold text-[#cda454] text-xl'>Login</h4>
            {/* {message && <p className='text-center font-bold mt-4 text-green-500'>{message}</p>}
            {errmsg && <p className='text-center font-bold mt-4 text-red-500'>{errmsg}</p>} */}
            <form className="max-w-sm mx-auto my-4" onSubmit={handleSubmit} >
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2.5 text-m font-medium text-heading text-[#cda454]">Your email</label>
                    <input type="email" id="email" name='email' value={uemail} onChange={(e) => setUEmail(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2.5 text-m font-medium text-heading text-[#cda454]">Your password</label>
                    <input type="password" id="password" name='password' value={pass} onChange={(e) => setPass(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base rounded-xl focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="••••••••" required />
                </div>
                <button type="submit" className="text-white bg-[#cda454] cursor-pointer bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base rounded-xl text-sm px-4 py-2.5 focus:outline-none">Login</button>
            </form>
        </>
    )
}

export default Login
