import { Paper } from "@mui/material";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 7000);
  }, [navigate]);

  return (
    <Paper className='not-found-page' elevation={3}>
      <h2 className='fw-400'>Sorry... such pase doesn't exist</h2>
      <p className='fw-300'>
        Go to{" "}
        <span onClick={() => navigate("/")} className='fw-500'>
          main page
        </span>{" "}
        or you'll be automatically redirected
      </p>
    </Paper>
  );
}
