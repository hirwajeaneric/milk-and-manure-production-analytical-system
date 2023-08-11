import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;

const initialState = {
    user: {},
    allMccEmployees: [],
    employeesOfSelectedMcc: [],
    employeesOfSelectedDistrict: [],
    allVeterinaries: [],
    veterinariesForSelectedDistrict:[],
    allRegisteredFarmers: [],
    farmersForSelectedMcc: [],
    farmersForSelectedDistrict: [],
    
    numberOfAllMccEmployees: 0,
    numberOfEmployeesOfSelectedMcc: 0,
    numberOfEmployeesOfSelectedDistrict: 0,
    numberOfAllVeterinaries: 0,
    numberOfVeterinariesForSelectedDistrict:0,
    numberOfAllRegisteredFarmers: 0,
    numberOfFarmersForSelectedMcc: 0,
    numberOfFarmersForSelectedDistrict: 0, 
    
    isLoading: false,
}

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (filter, thunkAPI) => {
        const { id, role } = filter;
        try {
            var response = '';
            
            if (role !== 'mcc') {
                response = await axios.get(serverUrl+`/api/v1/mmpas/otheruser/findById?id=${id}`);
            }
            response = await axios.get(serverUrl+`/api/v1/mmpas/mccuser/findById?id=${id}`);

            response.data.user.joinDate = new Date(response.data.user.joinDate).toLocaleString();
            return response.data.user;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getAllMccEmployees = createAsyncThunk(
    'user/getEmployeesForMcc',
    async (thunkAPI) => {
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/mccuser/list`);
            response.data.users.forEach(element => {
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getEmployeesForMcc = createAsyncThunk(
    'user/getEmployeesForMcc',
    async (filter, thunkAPI) => {
        const { mccId } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/mccuser/findByMccId?mccId=${mccId}`);
            response.data.users.forEach(element => {
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getEmployeesInDistrict = createAsyncThunk(
    'user/getEmployeesInDistrict',
    async (filter, thunkAPI) => {
        const { district } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/mccuser/findByDistrict?district=${district}`);
            response.data.users.forEach(element => {
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getFarmersInDistrict = createAsyncThunk(
    'user/getFarmersInDistrict',
    async (filter, thunkAPI) => {
        const { district } = filter;
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/otheruser/findFarmersByDistrict?district=${district}`);
            response.data.users.forEach(element => {
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getVeterinaries = createAsyncThunk(
    'user/getVeterinaries',
    async (thunkAPI) => {
        try { 
            console.log();
            const response = await axios.get(`${serverUrl}/api/v1/mmpas/otheruser/findByUserRole?role=veterinary`);
            response.data.users.forEach(element => {
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

export const getFarmers = createAsyncThunk(
    'user/getFarmers',
    async (thunkAPI) => {
        try { 
            const response = await axios.get(serverUrl+`/api/v1/mmpas/otheruser/findByUserRole?role=farmer}`);
            response.data.users.forEach(element => {
                element.joinDate = new Date(element.joinDate).toLocaleString();
            });
            return response.data.users;
        } catch (error) {
            return thunkAPI.rejectWithValue('Something went wrong!!');
        }
    }
);

const user = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [getUserInfo.pending] : (state) => {
            state.isLoading = true;
        },
        [getUserInfo.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        [getUserInfo.rejected] : (state) => {
            state.isLoading = false;
        },
        [getAllMccEmployees.pending] : (state) => {
            state.isLoading = true;
        },
        [getAllMccEmployees.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.allMccEmployees = action.payload;
            state.numberOfAllMccEmployees = state.allMccEmployees.length;
        },
        [getAllMccEmployees.rejected] : (state) => {
            state.isLoading = false;
        },
        [getEmployeesForMcc.pending] : (state) => {
            state.isLoading = true;
        },
        [getEmployeesForMcc.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.employeesOfSelectedMcc = action.payload;
            state.numberOfEmployeesOfSelectedMcc = state.employeesOfSelectedMcc.length;
        },
        [getEmployeesForMcc.rejected] : (state) => {
            state.isLoading = false;
        },
        [getEmployeesInDistrict.pending] : (state) => {
            state.isLoading = true;
        },
        [getEmployeesInDistrict.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.employeesOfSelectedDistrict = action.payload;
            state.numberOfEmployeesOfSelectedDistrict = state.employeesOfSelectedDistrict.length;
        },
        [getEmployeesInDistrict.rejected] : (state) => {
            state.isLoading = false;
        },
        [getVeterinaries.pending] : (state) => {
            state.isLoading = true;
        },
        [getVeterinaries.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.allVeterinaries = action.payload;
            state.numberOfAllVeterinaries = state.allVeterinaries.length;
        },
        [getVeterinaries.rejected] : (state) => {
            state.isLoading = false;
        },
        [getFarmers.pending] : (state) => {
            state.isLoading = true;
        },
        [getFarmers.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.allRegisteredFarmers = action.payload;
            state.numberOfAllRegisteredFarmers = state.allRegisteredFarmers.length;
        },
        [getFarmers.rejected] : (state) => {
            state.isLoading = false;
        },
        [getFarmersInDistrict.pending] : (state) => {
            state.isLoading = true;
        },
        [getFarmersInDistrict.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.farmersForSelectedDistrict = action.payload;
            state.numberOfFarmersForSelectedDistrict = state.farmersForSelectedDistrict.length;
        },
        [getFarmersInDistrict.rejected] : (state) => {
            state.isLoading = false;
        }
    }
});

export const { } = user.actions;
export default user.reducer;