import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from 'sonner'
import axios from 'axios'

const Register = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "",
        file: "",
        phoneNumber: ""
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }
    const ChangeFilehandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("role", input.role);
            formData.append("phoneNumber", input.phoneNumber);
            if (input.file) {
                formData.append("file", input.file);
            }
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message)

            }
        } catch (error) {
            console.log(error);
            const errorMessage = error.response?error.response.data.message:"An unexpected error occured";
            toast.error(errorMessage); 
        }
    }
    
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-500 rounded-md p-4 my-10' >
                    <h1 className='font-bold text-xl text-center mb-5 text-blue-600'>Register</h1>
                    <div className='my-2'>
                        <Label>Name</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="jhon Doe"></Input>

                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="jhondoe@gmail.com"></Input>

                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="********"></Input>
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="+1234567890"></Input>
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup defaultValue="comfortable" className="flex items-center gap-4 my-5">
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="Student" onChange={changeEventHandler} checked={input.role === 'Student'} className="cursor-pointer"></Input>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="Recruiter" onChange={changeEventHandler} checked={input.role === 'Recruiter'} className="cursor-pointer"></Input>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Label>Profile Photo</Label>
                        <Input type="file" accept="image/*" onChange={ChangeFilehandler} className="cursor-pointer" ></Input>
                    </div>
                    <button type="submit" className='block w-full py-3 my-3 text-white bg-black hover:bg-black/90 rounded-md cursor-pointer'>
                        Register
                    </button>
                    {/* already account then login*/}
                    <p className='text-gray-500 text-md my-2'>
                        Already have an account? <Link to="/login" className='text-blue-500 font-semibold'>Login </Link>
                    </p>
                </form>

            </div>
        </div>
    )
}

export default Register