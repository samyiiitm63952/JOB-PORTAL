import { createSlice } from "@reduxjs/toolkit";

const application = createSlice({
    name:"application",
    initialState:{
        application:[],
    },
    reducers:{
        setSingleApplication:(state,action)=>{
            state.setSingleApplication = action.payload;
        }
    }
})
export const {setSingleApplication} = applicationSlice.action;
export default applicationSlice.reducer;
export const applicationSliceReducer = application.reducer