import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emp_id: null,
    menuType: null,
    token: null
};

export const authSlice = createSlice({
    name: " auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.emp_id = action.payload.emp_id;
            state.token = action.payload.emp_id;
            
        },
        setLogout: (state) => {
            state.emp_id = null;
            state.token = null;
            state.menuType = null;
       
        },
        setMenu: (state, action) => {
            state.menuType = action.payload.emp_id;
            
        }
    }
})

export const{ setLogin, setLogout, setMenu } = authSlice.actions;
export default authSlice.reducer;