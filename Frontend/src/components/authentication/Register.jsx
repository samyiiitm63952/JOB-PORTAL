import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from 'sonner'
import axios from 'axios'
import { Button } from '@base-ui/react'
import { Loader2 } from 'lucide-react'
import OtpModal from './OtpModal'

const Register = () => {
    const [loading,setLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
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
        if (!input.fullname || !input.email || !input.password || !input.phoneNumber || !input.role) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_ENDPOINT}/send-otp`, {
                email: input.email
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (res.data.success) {
                toast.success(res.data.message || "Verification code sent to your email!");
                setShowOtpModal(true);
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Failed to send verification code";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const verifyAndRegisterHandler = async (otp) => {
        try {
            const formData = new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("role", input.role);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("otp", otp);
            if (input.file) {
                formData.append("file", input.file);
            }

            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            if (res.data.success) {
                setShowOtpModal(false);
                toast.success(res.data.message || "Account created successfully!");
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Registration failed";
            toast.error(errorMessage);
            throw error; // Rethrow so modal stops loading
        }
    };

    const resendOtpHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_ENDPOINT}/send-otp`, {
                email: input.email
            }, {
                headers: { "Content-Type": "application/json" }
            });
            if (res.data.success) {
                toast.success("A new verification code has been sent!");
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Failed to resend code";
            toast.error(errorMessage);
            throw error;
        }
    };
    
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 bg-white shadow-sm border border-gray-300 rounded-xl p-6 my-10' >
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
                    {loading?<Button><Loader2 className='mr-2 h-4 w-4 animate-spin' />Making an account for you</Button>: <button type="submit" className='block w-full py-3 my-3 text-white bg-black hover:bg-black/90 rounded-md cursor-pointer'>
                            Register
                        </button>}
                    
                    {/* already account then login*/}
                    <p className='text-gray-500 text-md my-2'>
                        Already have an account? <Link to="/login" className='text-blue-500 font-semibold'>Login </Link>
                    </p>
                </form>

            </div>

            {/* OTP Verification Modal */}
            <OtpModal
                open={showOtpModal}
                setOpen={setShowOtpModal}
                email={input.email}
                onVerify={verifyAndRegisterHandler}
                onResend={resendOtpHandler}
            />
        </div>
    )
}

export default Register