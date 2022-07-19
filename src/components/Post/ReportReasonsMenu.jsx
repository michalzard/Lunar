import { useState } from "react";
import { Button, Dialog, RadioGroup, Snackbar, Typography,Slide,Alert,Radio } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


function ReportReasonsMenu({isMobile,anchor,onClose}){

    const [openAlert,setOpenAlert]=useState(false);
    const closeAlert=()=>{setOpenAlert(false);}
    const submitReport=()=>{
      //POST REQUEST TO SERVER TO ASSIGN REPORT TO SPECIFIC USER
      console.log("submit report callback");
      onClose();
      setOpenAlert(true);
    }
    const pStyle={width:isMobile ? "80%" : "90%"};
  
    return(
      <>
      <Dialog
      id="ReportMenu"
      anchorel={anchor}
      open={Boolean(anchor)}
      onClose={onClose}
      >
      <div className="title"><Typography variant="h5">Report Reasons</Typography> <CloseIcon onClick={onClose}/></div>
      <RadioGroup defaultValue="Suspicious or spam">
      <Typography style={pStyle}>Suspicious or spam</Typography><Radio value="Suspicious or spam"/>
      <Typography style={pStyle}>It appears their account is hacked</Typography><Radio value="It appears their account is hacked"/>
      <Typography style={pStyle}>They are pretending to be someone else</Typography><Radio value="They are pretending to be someone else" />
      <Typography style={pStyle}>Profile includes abusive or hateful content</Typography><Radio value="Their profile includes abusive or hateful content"/>
      </RadioGroup>
      <Button variant="contained" onClick={submitReport}>Submit Report</Button>
      </Dialog>
  
      <Snackbar
      anchorOrigin={{vertical:"bottom",horizontal:"right"}}
      open={openAlert} // if dialog windows closes,display alert
      autoHideDuration={4000}
      onClose={closeAlert}
      TransitionComponent={Slide}
      >
      <Alert color="success">Report successfully submitted</Alert>
      </Snackbar>
      </>
    )
}

export default ReportReasonsMenu;