import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null,
        application: [],
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        setSingleApplication: (state, action) => {
            state.application = action.payload;
        }
    }
});

export const { setAllApplicants, setSingleApplication } = applicationSlice.actions;
export const applicationSliceReducer = applicationSlice.reducer;
export default applicationSlice.reducer;