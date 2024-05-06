import { createSlice } from "@reduxjs/toolkit";

export const userLoginSlice = createSlice({
    name:'userLogin',
    initialState:{
        user:null,
        error:null,
        loading:false
    },
    reducers:{
        setUser:(state,action) => {
            return {...state,
                loading:false,
                user:action.payload
            }
        },
        setLoginError:(state,action) => {
            return {...state,error:action.payload,loading:false}
        },
        setLoginLoading: state => {
            return {...state,loading:true}
        },
        deleteUser:state => {
            return {...state,user:null}
        }
    }
})

export const {setUser,setLoginLoading,setLoginError,deleteUser} = userLoginSlice.actions;

export default userLoginSlice.reducer;