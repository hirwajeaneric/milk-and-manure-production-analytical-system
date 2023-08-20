import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    selectedMcc: {},
    allmccs: [],
    numberOfAllmccs: 0,
    mccForSelectedDistrict: [],
    numberOfmccsForSelectedDistrict: 0,
    isLoading: false,
}

export const getMccDetails = createAsyncThunk(
    'mcc/getMccDetails',
    async (filter, thunkAPI) => {
        const { id } = filter;
        try {
            const response = await axios.get(`${serverUrl}/api/v1/mmpas/mcc/findById?id=${id}`);
            response.data.mcc.registrationdate = new Date(response.data.mcc.registrationdate).toLocaleString();
            return response.data.mcc;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMccByCode = createAsyncThunk(
    'mcc/getMccByCode',
    async (filter, thunkAPI) => {
        const { mccCode } = filter;
        try {
            const response = await axios.get(`${serverUrl}/api/v1/mmpas/mcc/findByCode?code=${mccCode}`);
            response.data.mcc.registrationdate = new Date(response.data.mcc.registrationdate).toLocaleString();
            return response.data.mcc;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getAllmccs = createAsyncThunk(
    'mcc/getAllmccs',
    async (thunkAPI) => {
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/mcc/list`);
            response.data.mccs.forEach(element => {
                element.registrationdate = new Date(element.registrationdate).toLocaleString();
            });
            return response.data.mccs
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getmccsForSelectedDistrict = createAsyncThunk(
    'mcc/getmccsForSelectedDistrict',
    async (filter, thunkAPI) => {
        const { district } = filter;
        try { 
            const response = await axios.get(`${serverUrl}/api/v1/mmpas/mcc/findByDistrict?district=${district}`);
            response.data.mccs.forEach(element => {
                element.registrationdate = new Date(element.registrationdate).toLocaleString();
            });
            return response.data.mccs;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const mccSlice = createSlice({
    name: 'mcc',
    initialState,
    extraReducers: {
        [getMccDetails.pending] : (state) => {
            state.isLoading = true;
        },
        [getMccDetails.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedMcc = action.payload;
        },
        [getMccDetails.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMccByCode.pending] : (state) => {
            state.isLoading = true;
        },
        [getMccByCode.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.selectedMcc = action.payload;
        },
        [getMccByCode.rejected] : (state) => {
            state.isLoading = false;
        },
        [getAllmccs.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllmccs.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.allmccs = action.payload;
        },
        [getAllmccs.rejected] : (state) => {
            state.isLoading = false;
        },
        [getmccsForSelectedDistrict.pending] : (state) => {
            state.isLoading = true;
        },
        [getmccsForSelectedDistrict.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.mccForSelectedDistrict = action.payload;
        },
        [getmccsForSelectedDistrict.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = mccSlice.actions;
export default mccSlice.reducer;