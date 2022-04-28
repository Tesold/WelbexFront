import { createSlice } from '@reduxjs/toolkit'


export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLOG_IN: false,
    todoArr: [],
    update: false
  },
  reducers: {
    LOG_IN:(state)=>{state.isLOG_IN=true},
    LOG_OUT:(state)=>{state.isLOG_IN=false},
    SET_TODO_ARR:(state, payload)=>{state.todoArr=payload.payload},
    DONE_TODO:(state:any, payload)=>{state.todoArr.splice(payload.payload, 1)},
    UPDATE:(state)=>{state.update=!state.update}
    }, 
})

export const { LOG_IN, LOG_OUT, SET_TODO_ARR, UPDATE, DONE_TODO } = loginSlice.actions;
export default loginSlice.reducer;

