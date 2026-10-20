import { setAllAdminJobs} from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch(); // ✅ must be at top level of hook, NOT inside useEffect

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.adminjob || res.data.job || []));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllAdminJobs();
  }, [])
}

export default useGetAllAdminJobs