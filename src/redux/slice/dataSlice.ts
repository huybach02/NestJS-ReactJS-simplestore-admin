import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface DataState {
  showSidebar: boolean;
  showModal: boolean;
  showDrawer: boolean;
  isLoading: boolean;
  isEditing: boolean;
  isConfirm: boolean;
  productSelected: {
    id: string;
    name: string;
    sku: string;
  };
  total: number;
  showModalExport: boolean;
  exportFields: {
    fields: string[];
    date: string[];
    isAllDate: boolean;
  };
  singleImageUploaded: {
    publicId: string;
  };
  multipleImageUploaded: {
    publicId: string[];
  };
}

const initialState: DataState = {
  showSidebar: false,
  showModal: false,
  showDrawer: false,
  isLoading: false,
  isEditing: false,
  isConfirm: false,
  productSelected: {
    id: "",
    name: "",
    sku: "",
  },
  total: 0,
  showModalExport: false,
  exportFields: {
    fields: [],
    date: [],
    isAllDate: false,
  },
  singleImageUploaded: {
    publicId: "",
  },
  multipleImageUploaded: {
    publicId: [],
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
    setShowDrawer: (state) => {
      state.showDrawer = true;
    },
    setCloseDrawer: (state) => {
      state.showDrawer = false;
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
    setProductSelected: (
      state,
      action: PayloadAction<{id: string; name: string; sku: string}>
    ) => {
      state.productSelected = action.payload;
    },
    clearProductSelected: (state) => {
      state.productSelected = {
        id: "",
        name: "",
        sku: "",
      };
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
    setSingleImageUploaded: (
      state,
      action: PayloadAction<{publicId: string}>
    ) => {
      state.singleImageUploaded.publicId = action.payload.publicId;
    },
    setMultipleImageUploaded: (
      state,
      action: PayloadAction<{publicId: string}>
    ) => {
      state.multipleImageUploaded.publicId = [
        ...state.multipleImageUploaded.publicId,
        action.payload.publicId,
      ];
    },
    clearMultipleImageUploaded: (state) => {
      state.multipleImageUploaded.publicId = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowSidebar,
  setShowModal,
  setCloseModal,
  setShowDrawer,
  setCloseDrawer,
  setIsLoading,
  setIsEditing,
  setIsConfirm,
  setTotal,
  setShowModalExport,
  setCloseModalExport,
  setExportFields,
  clearExportFields,
  setProductSelected,
  clearProductSelected,
  setSingleImageUploaded,
  setMultipleImageUploaded,
  clearMultipleImageUploaded,
} = dataSlice.actions;

export default dataSlice.reducer;
