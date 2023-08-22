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
    milkFilterType: 'year',
    milkFilterValue: new Date().getFullYear(),
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
            
            if (action.payload.periodType === 'year') {
                production = action.payload.milkProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
    
            function calculateDistrictMilkProduction(data) {
                const districtMap = new Map();
                let totalMilkProduction = 0; // Initialize the total milk production counter
              
                data.forEach(item => {
                  const district = item.district;
                  const quantity = item.quantity;
              
                  if (districtMap.has(district)) {
                    districtMap.set(district, districtMap.get(district) + quantity);
                  } else {
                    districtMap.set(district, quantity);
                  }
              
                  totalMilkProduction += quantity; // Add to the total milk production
                });
              
                const result = [];
              
                districtMap.forEach((totalQuantity, district) => {
                  result.push({
                    district: district,
                    totalMilkProduction: totalQuantity
                  });
                });
              
                return {
                  districtMilkProduction: result,
                  totalMilkProduction: totalMilkProduction // Include the total milk production in the result
                };
            }
            
            const { districtMilkProduction, totalMilkProduction } = calculateDistrictMilkProduction(production);
            
            districtMilkProduction.forEach((element, index) => {
                element.id = index;
                element.period = action.payload.periodValue;
            });

            console.log(districtMilkProduction);
            console.log("Total Milk Production:", totalMilkProduction);
              

            state.milkProductionOnCountryLevel = districtMilkProduction;
            state.amountOfMilkProductionOnCountryLevel = totalMilkProduction;
        },
        [getMilkProductionOnCountryLevel.rejected] : (state) => {
            state.isLoading = false;
        },
        [getMilkProductionOnDistrictLevel.pending] : (state) => {
            state.isLoading = true;
        },
        [getMilkProductionOnDistrictLevel.fulfilled] : (state, action) => {
            state.isLoading = false;

            var production = [];
            
            if (action.payload.periodType === 'year') {
                production = action.payload.milkProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
            
            function calculateMCCMilkProduction(data) {
                const mccMap = new Map();
                let totalMilkProduction = 0;
              
                data.forEach(item => {
                  const mccId = item.mccid;
                  const quantity = item.quantity;
              
                  if (mccMap.has(mccId)) {
                    mccMap.set(mccId, mccMap.get(mccId) + quantity);
                  } else {
                    mccMap.set(mccId, quantity);
                  }
              
                  totalMilkProduction += quantity; // Add to the total milk production
                });
              
                const result = [];
              
                mccMap.forEach((totalQuantity, mccId) => {
                  const mccInfo = data.find(item => item.mccid === mccId);
                  result.push({
                    mccId: mccId,
                    mccName: mccInfo.mccname,
                    totalMilkProduction: totalQuantity
                  });
                });
              
                return {
                  mccMilkProduction: result,
                  totalMilkProduction: totalMilkProduction // Include the total milk production in the result
                };
            }
            
            const { mccMilkProduction, totalMilkProduction } = calculateMCCMilkProduction(production);
            
            mccMilkProduction.forEach(element => {
                element.id = element.mccId;
                element.period = action.payload.periodValue;
            });
            
            state.milkProductionOnDistrictLevel = mccMilkProduction;
            state.amountOfMilkProductionOnDistrictLevel = totalMilkProduction;
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
                production = action.payload.milkProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            });

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
                production = action.payload.milkProduction.filter(element => Number(element.year) === action.payload.periodValue);
            } else if (action.payload.periodType === 'month') {
                production = action.payload.milkProduction.filter(element =>  Number(element.month) === action.payload.periodValue || Number(element.year) === new Date().getFullYear());
            }
            
            production.forEach(element => {
                quantity = quantity + element.quantity;
            });

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