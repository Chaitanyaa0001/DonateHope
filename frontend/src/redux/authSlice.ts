import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type Role = 'donar' | 'funder' | null;

interface AuthState {
    role: Role
}

const initialState: AuthState = {
    role: null
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setRole: (state, action:PayloadAction<Role>) =>{
            state.role = action.payload;
        },
    },
});
export const {setRole} = authSlice.actions;
export default authSlice.reducer;
