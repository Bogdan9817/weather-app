import { useEffect } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeError } from "../store/citiesSlice";

export default function withErrorHandler(Element: React.FC) {
  return function WithErrorHandler() {
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.cities.error);

    useEffect(() => {
      if (error) {
        setTimeout(() => {
          dispatch(removeError(null));
        }, 5000);
      }
    }, [error, dispatch]);

    return (
      <>
        <Element />
        {error && (
          <Alert severity='error'>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </>
    );
  };
}
