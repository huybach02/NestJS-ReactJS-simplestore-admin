import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface DataState {
  showSidebar: boolean;
  showModal: boolean;
  isLoading: boolean;
  isEditing: boolean;
  isConfirm: boolean;
  total: number;
}

const initialState: DataState = {
  showSidebar: false,
  showModal: false,
  isLoading: false,
  isEditing: false,
  isConfirm: false,
  total: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setShowModal: (state) => {
      state.showModal = true;
    },
    setCloseModal: (state) => {
      state.showModal = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    setIsConfirm: (state, action: PayloadAction<boolean>) => {
      state.isConfirm = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowSidebar,
  setShowModal,
  setCloseModal,
  setIsLoading,
  setIsEditing,
  setIsConfirm,
  setTotal,
} = dataSlice.actions;

export default dataSlice.reducer;
