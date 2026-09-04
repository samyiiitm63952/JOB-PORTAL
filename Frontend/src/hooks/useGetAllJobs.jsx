import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_ENDPOINT } from '@/utils/data';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';

const useGetAllJobs = () => {
  const dispatch = useDispatch(); // ✅ must be at top level of hook, NOT inside useEffect

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.job));
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllJobs();
  }, [])
}

export default useGetAllJobs