import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_ENDPOINT } from '@/utils/data';
import { setAllAppliedJobs } from '@/redux/applicationSlice';

const useGetAllAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications || []));
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllAppliedJobs([]));
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAllAppliedJobs;

