import { useSetAtom } from "jotai";
import type { AlertColor } from "@mui/material";
import { snackbarAtom } from "../store/snackbar-atom";

export function useSnackbar() {
  const setSnackbar = useSetAtom(snackbarAtom);

  const showSnackbar = (
    message: string,
    severity: AlertColor = "info",
    duration = 3000
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
      duration,
    });
  };

  return { showSnackbar };
}
