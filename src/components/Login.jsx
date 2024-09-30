import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        console.log(data)
        setError("")
        try {
            const session = await authService.login(data) // appwrite service ke login method se milta hia ek session, agar user logged in hai toh session me kuch hai and nahi hai toh session null hai
            if(session){
                const userData = await authService.getCurrentUser()  // agar session hai matlab user logged in hai, so we get the current user using that service 
                if(userData)  // agar user data aaya hai toh dispatch karke store ko batana padega ki current logged in user kaun hai 
                    dispatch(authLogin(userData));
                navigate('/')    // ab jab user login hogaya hai toh usko kahi aur bhejdo, login page pe hi kyu rkhna hia 
            }
        } catch (error) {
            setError(error.message)
            
        }
    }
//handleSubmit ek method hai jahape hum apna method dete hai ki form aise handle hoga 
return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
        <div className='space-y-5'>
        <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                {/*This line registers the input field with the useForm library. It associates the input with the "password" field in the form state and applies validation rules ({ required: true }), indicating that this field must have a value for the form to be considered valid. */}
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>

        </div>
        </form> 
        </div>
    </div>
)
}

export default Login
