import React from 'react'
import MuiAlert from '@mui/material/Alert';
import SignalCellular4BarIcon from '@mui/icons-material/SignalCellular4Bar';
import SignalCellularConnectedNoInternet0BarIcon from '@mui/icons-material/SignalCellularConnectedNoInternet0Bar';
import { Offline,Online} from 'react-detect-offline'
import { Avatar, Snackbar } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const NetworkComp = () => {
      const [on, setOn] = React.useState(true);
  const handleOnClose = (event, reason) => {
    setOn(false);
  };

  const [off,setOff] = React.useState(true)
    const handleOffClose = (event, reason) => {
    setOff(false);
  };
    return (
        <>
           <Online>
          <Snackbar open={on} autoHideDuration={3000} onClose={handleOnClose} 
          sx={{width:'100%',mt:5}}
          anchorOrigin={{
         vertical: 'top',
         horizontal: 'center'}}>
            <Alert icon={<SignalCellular4BarIcon fontSize="inherit" />} onClose={handleOnClose} severity="success" sx={{ width: '100%' }}>
              you're are connected
           </Alert>
          </Snackbar>
          </Online>
          <Offline>
          <Snackbar open={off}  onClose={handleOffClose} 
          sx={{width:'100%',mt:5}}
          anchorOrigin={{
         vertical: 'top',
         horizontal: 'center'}}>
            <Alert icon={<SignalCellularConnectedNoInternet0BarIcon fontSize="inherit" />} onClose={handleOffClose} severity="error" sx={{ width: '100%' }}>
              you're are not connected
           </Alert>
          </Snackbar>
          </Offline>  
        </>
    )
}

export default NetworkComp
