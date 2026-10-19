import React, { useState } from 'react';

import Navbar from '../components_lite/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';

const Companies = () => {
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');

    return (
        <div>
            <Navbar />

            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between gap-4">
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                    />

                    <Button
                        className="bg-black rounded-2xl text-white"
                        onClick={() => navigate('/admin/companies/create')}
                    >
                        Add Company
                    </Button>
                </div>

                <div>
                    <CompaniesTable filterText={filterText} />
                </div>
            </div>
        </div>
    );
};

export default Companies;