import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loader: false,
  leaderBoard: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoader: (state, {payload}) => {
      state.loader = payload;
    },
    setLeaderBoard: (state, {payload}) => {
      console.log('[homeSlice] leaderBoard: ', payload);
      // const _leaderBoardList = state.leaderBoard.length > 0 ? [...state.leaderBoard, payload] : [payload];
      console.log('[homeSlice.ts] : ', ...state.leaderBoard, [payload]);
      state.leaderBoard = state.leaderBoard.length > 0 ? [...state.leaderBoard, payload] : [payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLoader, setLeaderBoard} = homeSlice.actions;
export default homeSlice.reducer;
