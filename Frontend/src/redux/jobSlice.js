import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
        alljobs: [],
        singleJob: null,
        allAdminJobs:[],
        searchJobByText:"",
        searchedQuery:"",
        selectedFilters: {
            Location: [],
            Industry: [],
            Experience: [],
            Salary: []
        }
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.alljobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload
        },
        setAllAdminJobs :(state,action)=>{
            state.allAdminJobs = action.payload
        },
        setSearchJobByText :(state,action)=>{
            state.searchJobByText = action.payload;
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload;
        },
        setSelectedFilters:(state,action)=>{
            state.selectedFilters = action.payload;
        },
        clearAllFilters:(state)=>{
            state.selectedFilters = {
                Location: [],
                Industry: [],
                Experience: [],
                Salary: []
            };
            state.searchedQuery = "";
        }
    }
})

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setSearchedQuery,
    setSelectedFilters,
    clearAllFilters
} = jobSlice.actions
export default jobSlice.reducer