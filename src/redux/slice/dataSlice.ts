import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface DataState {
  showSidebar: boolean;
  showModal: boolean;
  isLoading: boolean;
  isEditing: boolean;
  isConfirm: boolean;
  total: number;
  showModalExport: boolean;
  exportFields: {
    fields: string[];
    date: string[];
    isAllDate: boolean;
  };
}

const initialState: DataState = {
  showSidebar: false,
  showModal: false,
  isLoading: false,
  isEditing: false,
  isConfirm: false,
  total: 0,
  showModalExport: false,
  exportFields: {
    fields: [],
    date: [],
    isAllDate: false,
  },
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
    setShowModalExport: (state) => {
      state.showModalExport = true;
    },
    setCloseModalExport: (state) => {
      state.showModalExport = false;
    },
    setExportFields: (
      state,
      action: PayloadAction<{
        fields: string[];
        date: string[];
        isAllDate: boolean;
      }>
    ) => {
      state.exportFields = action.payload;
    },
    clearExportFields: (state) => {
      state.exportFields = initialState.exportFields;
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
  setShowModalExport,
  setCloseModalExport,
  setExportFields,
  clearExportFields,
} = dataSlice.actions;

export default dataSlice.reducer;
