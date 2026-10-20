import { setSingleCompany } from '@/redux/companyslice.js';
import { COMPANY_API_ENDPOINT } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`, {
                    withCredentials: true
                });
                console.log("company ",res.data.company);
                console.log("API Response", res.data);
                console.log("Fetched data",res.data)
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleCompany();
    }, [companyId, dispatch]);
};

export default useGetCompanyById;
