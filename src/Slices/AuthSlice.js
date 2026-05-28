import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        _id:"",
        user:null,
        token:"",
        role:null,
        isLoggedIn:false,
    },
    reducers:{
        loginSuccess: (state,action)=>{
            state._id = action.payload.userWithoutPass._id
            state.user = action.payload.userWithoutPass.email
            state.role = action.payload.userWithoutPass.role
            state.token = action.payload.token
            state.isLoggedIn = true
        },
        logout: (state)=>{
            state._id = ""
            state.user = null
            state.role = null
            state.isLoggedIn = false
            state.token = ""
        }
    }
})

export const {loginSuccess,logout} = authSlice.actions

export default authSlice.reducer 