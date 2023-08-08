import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    milkProductionOnCountryLevel: [],
    amountOfMilkProductionOnCountryLevel: 0,
    milkProductionOnDistrictLevel: [],
    amountOfMilkProductionOnDistrictLevel: 0,
    milkProductionOnMccLevel: [],
    amountOfMilkProductionOnMccLevel: 0,
    milkProductionForFarmer: [],
    amountOfMilkProductionForFarmer: 0,
    isLoading: false,
}

export const getMilkProductionOnCountryLevel = createAsyncThunk(
    'milk/getMilkProductionOnCountryLevel',
    async (filter, thunkAPI) => {
        const { periodType, periodValue } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/list`);
            response.data.milkProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMilkProductionOnDistrictLevel = createAsyncThunk(
    'milk/getMilkProductionOnDistrictLevel',
    async (filter, thunkAPI) => {
        const { district, periodType, periodValue } = filter;
        try { 
            const response = await axios.get(`${serverUrl}/api/v1/mmpas/milk/findByDistrict?district=${district}`);
            response.data.milkProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMilkProductionOnMCCLevel = createAsyncThunk(
    'milk/getMilkProductionOnMCCLevel',
    async (filter, thunkAPI) => {
        const { mccId, periodType, periodValue } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/findByMccId?mccId=${mccId}`);
            response.data.milkProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getMilkProductionForFarmer = createAsyncThunk(
    'milk/getMilkProductionForFarmer',
    async (filter, thunkAPI) => {
        const { farmerId, periodType, periodValue } = filter;
        try {
            const response = await axios.get(serverUrl+`/api/v1/mmpas/milk/findByFarmerId?farmerId=${farmerId}`);
            response.data.milkProduction.forEach(element => {
                element.date = new Date(element.date).toLocaleString();
            });
            return { milkProduction: response.data.milkProduction, periodType: periodType, periodValue: periodValue }
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const milkProduction = createSlice({
    name: 'milk',
    initialState,
    extraReducers: {
        [getMilkProductionOnCountryLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionOnCountryLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.milkProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

            state.milkProductionOnCountryLevel = production;
            state.amountOfMilkProductionOnCountryLevel = quantity;
        },
        [getMilkProductionOnCountryLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMilkProductionOnDistrictLevel.pending] : (state) => {
            state.isLoading = true;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.milkProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

            state.milkProductionOnDistrictLevel = production;
            state.amountOfMilkProductionOnDistrictLevel = quantity;
        },
        [getMilkProductionOnDistrictLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
        },
        [getMilkProductionOnDistrictLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMilkProductionOnMCCLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionOnMCCLevel.fulfilled] : (state, action) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.milkProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

            state.milkProductionOnMccLevel = production;
            state.amountOfMilkProductionOnMccLevel = quantity;
        },
        [getMilkProductionOnMCCLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMilkProductionForFarmer.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionForFarmer.fulfilled] : (state, action) => {
            state.isLoading = false;
            var production = [];
            var quantity = 0;
            if (action.payload.periodType === 'year') {
                production = action.payload.milkProduction.filter(element => element.year === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  element.month === action.payload.periodValue || element.year === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            })

            state.milkProductionForFarmer = production;
            state.amountOfMilkProductionForFarmer = quantity;
        },
        [getMilkProductionForFarmer.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = milkProduction.actions;
export default milkProduction.reducer;