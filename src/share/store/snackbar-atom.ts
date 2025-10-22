// src/store/snackbar-atom.ts
import { atom } from "jotai";
import type { AlertColor } from "@mui/material";

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number;
}

export const snackbarAtom = atom<SnackbarState>({
  open: false,
  message: "",
  severity: "info",
  duration: 3000,
});
