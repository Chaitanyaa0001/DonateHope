import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type Role = 'donor' | 'funder' | null;

interface AuthState {
    role: Role,
    loading: boolean
}

const initialState: AuthState = {
    role: null,
    loading: true
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setRole: (state, action:PayloadAction<Role>) =>{
            state.role = action.payload;
            state.loading = false;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    },
});
export const {setRole, setLoading} = authSlice.actions;
export default authSlice.reducer;
