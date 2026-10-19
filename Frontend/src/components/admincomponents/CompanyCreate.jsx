import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_ENDPOINT } from '@/utils/data'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'
import { toast } from 'sonner'


const CompanyCreate = () => {
    const navigate = useNavigate();
    const [CompanyName, setCompanyName] = useState("")
    const dispatch = useDispatch();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, {CompanyName},{
                headers:{
                    "content-type":"application/json",
                },
                withCredentials:true,
            })
            console.log(res.data);
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10 '> <h1 className='font-bold text-2xl'>
                    Company Name
                </h1>
                    <p className='text-gray-600'>
                        Company Description
                    </p>
                </div>
                <Label>Company Name</Label>
                <Input type="text" placeholder="Company Name" className="my-2" onChange ={(e)=>{
                    setCompanyName(e.target.value)
                }} />
                <div className='flex items-center p-4 gap-2 my-10'>
                    <Button onClick={() => navigate("/admin/companies")} className={"w-20 h-10 rounded-2xl"} variant="outline" >Cancel</Button>
                    <Button onClick={registerNewCompany} className={"text-white w-24 h-10 rounded-2xl bg-black"}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate