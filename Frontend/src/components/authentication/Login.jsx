import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector((store)=>store.auth);
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            const ermsg = error.response ? error.response.data.message : "An unexpected error occured"
            toast.error(ermsg)
        }
        finally{
            dispatch(setLoading(false))
        }
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-500 rounded-md p-4 my-10' >
                    <h1 className='font-bold text-xl text-center mb-5 text-blue-600'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="jhondoe@gmail.com"></Input>

                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="********"></Input>
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup defaultValue="comfortable" className="flex items-center gap-4 my-5">
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="Student" onChange={changeEventHandler} checked={input.role==='Student'} className="cursor-pointer"></Input>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                               <Input type="radio" name="role" value="Recruiter" onChange={changeEventHandler} checked={input.role==='Recruiter'} className="cursor-pointer"></Input>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading?<Button><Loader2 className='mr-2 h-4 w-4 animate-spin' /> </Button>: <button type="submit" className='block w-full py-3 my-3 text-white bg-black hover:bg-black/90 rounded-md cursor-pointer'>
                            Login
                        </button>
                    }

                       
                        {/* if no account then register*/}
                        <p className='text-gray-500 text-md my-2'>
                            No Account? <Link to="/register" className='text-blue-500 font-semibold'>Register </Link>
                        </p>
                </form>

            </div>
        </div>
    )
}

export default Login