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
                production = action.payload.manureProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

            state.manureProductionOnCountryLevel = production;
            state.amountOfManureProductionOnCountryLevel = quantity;
        },
        [getManureProductionOnCountryLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getManureProductionOnDistrictLevel.pending] : (state) => {
            state.isLoading = true;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.manureProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

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
                production = action.payload.manureProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

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
                production = action.payload.manureProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.manureProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

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