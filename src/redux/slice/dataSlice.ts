import {createSlice} from "@reduxjs/toolkit";

export interface DataState {
  showSidebar: boolean;
}

const initialState: DataState = {
  showSidebar: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setShowSidebar} = dataSlice.actions;

export default dataSlice.reducer;
