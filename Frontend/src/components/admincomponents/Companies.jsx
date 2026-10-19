import React from 'react'
import Navbar from '../components_lite/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'

    
const Companies = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className=' max-w-6xl mx-auto my-10'>
                <div flex items-center justify-between>
                    <Input className="w-fit " placeholder="filter by Name" ></Input>
                    <Button className={"bg-black rounded-2xl  text-white"} onClick={()=>{
                        navigate("/admin/companies/create")
                    }}>
                        Add Company
                    </Button>
                </div>
                <div>
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies