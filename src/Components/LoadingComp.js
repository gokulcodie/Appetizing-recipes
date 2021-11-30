import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Online } from 'react-detect-offline';
import { Avatar, Grid } from '@mui/material';
import '../loader.css'

export default function LoadingComp() {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        {/*  <CircularProgress color="inherit" /> */}
    <div class="pan-loader">
  <div class="loader">
  </div>
  <div class="pan-container">
    <div class="pan"></div>
    <div class="handle"></div>
  </div>
  <div class="shadow"></div>
</div>
    </Backdrop>
    </div>
  );
}
