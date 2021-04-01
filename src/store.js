import {createSlice} from '@reduxjs/toolkit';
import {createStore} from 'redux';


const defaultState = {
    userObj: null
}


const tweets = createSlice({
    name: "TweetsReducer",
    initialState: defaultState,
    reducers: {
        setUserInfo: (state, action) => {
            // const newState = {...state};
            state.userObj = action.payload;
            // return newState;
        }
    }
})

const store = createStore(tweets.reducer);

export const { setUserInfo } = tweets.actions;
export default store;