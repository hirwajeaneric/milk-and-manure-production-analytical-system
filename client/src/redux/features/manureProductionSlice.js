import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    manureProductionOnCountryLevel: [],
    amountOfManureProductionOnCountryLevel: 0,
    manureProductionOnDistrictLevel: [],
    amountOfManureProductionOnDistrictLevel: 0,
    manureProductionOnMccLevel: [],
    amountOfManureProductionOnMccLevel: 0,
    manureProductionForFarmer: [],
    amountOfManureProductionForFarmer: 0,
    manureFilterType: 'year',
    manureFilterValue: new Date().getFullYear(),
    isLoading: false,
}

export const getManureProductionOnCountryLevel = createAsyncThunk(
    'manure/getManureProductionOnCountryLevel',
    async (filter, thunkAPI) => {
        const { periodType, periodValue } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/manure/list`);
            response.data.manureProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { manureProduction: response.data.manureProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getManureProductionOnDistrictLevel = createAsyncThunk(
    'manure/getManureProductionOnDistrictLevel',
    async (filter, thunkAPI) => {
        const { district, periodType, periodValue } = filter;
        try { 
            const response = await axios.get(`${serverUrl}/api/v1/mmpas/manure/findByDistrict?district=${district}`);
            response.data.manureProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { manureProduction: response.data.manureProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getManureProductionOnMCCLevel = createAsyncThunk(
    'manure/getManureProductionOnMCCLevel',
    async (filter, thunkAPI) => {
        const { mccId, periodType, periodValue } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/manure/findByMccId?mccId=${mccId}`);
            response.data.manureProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            
            return { manureProduction: response.data.manureProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getManureProductionForFarmer = createAsyncThunk(
    'manure/getManureProductionForFarmer',
    async (filter, thunkAPI) => {
        const { farmerId, periodType, periodValue } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/manure/findByFarmerId?farmerId=${farmerId}`);
            response.data.manureProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { manureProduction: response.data.manureProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const manureProduction = createSlice({
    name: 'manure',
    initialState,
    extraReducers: {
        [getManureProductionOnCountryLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getManureProductionOnCountryLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.manureProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            });

            production.sort((a, b) => new Date(a.date) - new Date(b.date));

            state.manureProductionOnCountryLevel = production;
            state.amountOfManureProductionOnCountryLevel = quantity;
        },
        [getManureProductionOnCountryLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getManureProductionOnDistrictLevel.pending] : (state) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.manureProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }

            production.sort((a, b) => new Date(b.date) - new Date(a.date));

            production.forEach(element => {
                quantity = quantity + element.quantity;
            });

            state.manureProductionOnDistrictLevel = production;
            state.amountOfManureProductionOnDistrictLevel = quantity;
        },
        [getManureProductionOnDistrictLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getManureProductionOnDistrictLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getManureProductionOnMCCLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getManureProductionOnMCCLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.manureProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            });

            production.sort((a, b) => new Date(b.date) - new Date(a.date));

            state.manureProductionOnMccLevel = production;
            state.amountOfManureProductionOnMccLevel = quantity;
        },
        [getManureProductionOnMCCLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getManureProductionForFarmer.pending] : (state) => {
            state.isLoading = true;
        },
        [getManureProductionForFarmer.fulfilled] : (state, action) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.manureProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            });

            production.sort((a, b) => new Date(b.date) - new Date(a.date));

            state.manureProductionForFarmer = production;
            state.amountOfManureProductionForFarmer = quantity;
        },
        [getManureProductionForFarmer.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = manureProduction.actions;
export default manureProduction.reducer;