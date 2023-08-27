import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: '',
    location: '',
    isLoading: false,
}

const report = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport: (state, action) => {
            state.type = action.payload.type;
            state.location = action.payload.location;
        }
    }
});

export const { setReport } = report.actions;
export default report.reducer;