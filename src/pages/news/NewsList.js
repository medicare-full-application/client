import React from "react";
import { Grid } from "@mui/material";
import MainHeader from "../../components/MainHeader";
import { useDispatch, useSelector } from "react-redux";
import { NewsListImpl } from "./NewsListImpl";

export const NewsList = () => {
  const userType = useSelector((state) => state.user.userType);
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12}>
          <NewsListImpl />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
