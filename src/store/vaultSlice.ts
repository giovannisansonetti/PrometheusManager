import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";
import { VaultState } from "./vaultSlice.models";

const initialState: VaultState = {
  key: null,
  isVaultUnlocked: false,
};

export const vaultSlice = createSlice({
  name: "vault",
  initialState,
  reducers: {
    setDerivedKey(state, action: PayloadAction<string>) {
      state.key = action.payload;
      state.isVaultUnlocked = true;
    },
    clearDerivedKey(state) {
      state.key = null;
      state.isVaultUnlocked = false;
    },
  },
});

export const { setDerivedKey, clearDerivedKey } = vaultSlice.actions;

export const store = configureStore({
  reducer: vaultSlice.reducer,
});
