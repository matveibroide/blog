import { createSlice } from "@reduxjs/toolkit";

export const updateUserSlice = createSlice({
    name:'updateUser',
    initialState:{
        error:null,
        loading:false,
        updateSuccess:null
    },
    reducers:{
        setUpdateError:(state,action) => {
            return {...state,error:action.payload,loading:false}
        },
        setUpdateLoading:(state) => {
            return {...state,loading:true}
        },

        setUpdateSuccess:(state) => {
            return {...state,updateSuccess:true,loading:false,error:false}
        } 
    }
})


 export const {setUpdateError,setUpdateLoading,setUpdateSuccess} = updateUserSlice.actions;
 export default updateUserSlice.reducer;