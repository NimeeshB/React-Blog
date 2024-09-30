import { createSlice } from "@reduxjs/toolkit";
//everytime store se puchenge if the user is logged in or not
const initialState = {
    status : false, // means abhi user authenticated nai hai 
    userData: null // user ke bareieme koi information chahieye toh yaha rhegi, by default kuch nai hai
}

//Slice ko name, initialState and reducers dene padte hai
//authslice is used to track user authentication 
const authSlice = createSlice({
    name: "auth",
    initialState,
    //reducers are pure functions which are used to change the applications state 
    //reducers ke andar functions ko "state" aur "action" ka access
    //action se milta hai payload and state ke andar jo bhi value update karni hai woh initial state ke baad update hoti hai 
    reducers: {
        login: (state, action)=> {
            state.status = true // agar ye wala method kisine use kiya hai toh login ka status true kardo 
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false; // logout honepe status of user false kardiya aur userdata flush kardiya
            state.userData=null;
        }

    }
});

//authslice me se reducers ko export karte hai 
export const {login, logout} = authSlice.actions;
export default authSlice.reducer; // authslice ke andar woh login and logout actions hai woh export kare hai 