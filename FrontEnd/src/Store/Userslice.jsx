import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

let userDetail=JSON.parse(localStorage.getItem('mediaApp'))
console.log(userDetail)


const initialState = {
login: userDetail? userDetail.login:  false,
token: userDetail? userDetail.token: '',
user:  userDetail? userDetail.user:  ""


}

  export const fetchUserByToken = createAsyncThunk(
    'fetchUserByToken',
    async (token) => {
      const response = await axios.get('http://localhost:8090/user/loginuser',{
        headers:{
            'Authorization':token
        }
      })
      console.log(response)
      return response.data
    },
  )

export const Userslice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    userlogin: (state,action) => {
  console.log(action)
    state.login=true;
    state.token=action.payload.token;
    state.user=action.payload.user

    },
   userlogout: (state,action) => {
  localStorage.removeItem('mediaApp')
    state.login=false;
    state.token=""
    state.user=""


    },
updateuser:(state,action)=>{
state.user=action.payload
}

  },
 extraReducers: (builder) => {
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
        console.log(action)
        state.user = action.payload
    
    })
  },
})

export const {userlogin,userlogout,updateuser} = Userslice.actions

export default Userslice.reducer