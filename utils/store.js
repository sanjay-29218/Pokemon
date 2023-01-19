import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const colorslice= createSlice({
name:"colors",
initialState:{
    rock:"#f7f7f",
    ghost:'#ffffa1',
    electric:'#F6D6A7',
    bug:'#e0a7f6',
    poison:'#F4F4F4',
    normal:'#ffc0cbdc',
    fairy:'#FBE3DF',
    grass:'#E2F9E1',
    water:'#E0F1FD',
    dark:'#FBE3DF',
    flying:'#FBE3D',
    psychic:'#FBE3DF',
    ice:'#FBE3DF',
    dragon:'#FBE3DF',
    fire:'#FBE3DF',
    icon:'moon',
    normal:'#FBE3F',
    ground:'#FBE3DF',
    fighting:'#FBE3DF',
    steel:'#FBE3DF',
    shadow:'#FBE3DF',
    


},
reducers:{
     iconMoon:state=>{
        state.icon= 'moon'
     },
     iconSun:state=>{
        state.icon= 'sun'
    },
   }
})
// config the store 
const store= configureStore({
   reducer: {
      colors: colorslice.reducer
   }
})

// export default the store 
export default store

// export the action
export const coloraction = colorslice.actions