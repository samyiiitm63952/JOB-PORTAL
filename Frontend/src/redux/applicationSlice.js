import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null,
        allAppliedJobs: [],
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSingleApplication: (state, action) => {
            state.allAppliedJobs = action.payload;
        }
    }
});

export const { setAllApplicants, setAllAppliedJobs, setSingleApplication } = applicationSlice.actions;
export const applicationSliceReducer = applicationSlice.reducer;
export default applicationSlice.reducer;