import React from 'react';
import {Dialog,DialogContent,DialogTitle,DialogActions,Button, Typography} from '@mui/material';
import '../../styles/components/Post/DiscardDialog.scss';

function DiscardDialog({open,handleClose,onDiscard,onSave}) {
  return (
    <div className='postDiscard'>
    <Dialog
    open={open}
    onClose={handleClose}
    >
    <DialogTitle>Save Draft?</DialogTitle>

    <DialogContent>
    <Typography variant='overline'>
    You can save this to send it later from your drafts.
    </Typography>
    <div className='buttons'>
    <Button variant='outlined' fullWidth onClick={onSave ? onSave : null}>Save</Button>
    <Button variant='outlined' fullWidth onClick={onDiscard ? onDiscard : null}>Discard</Button>
    </div>
    </DialogContent>
    
    </Dialog>
    </div>
  )
}

export default DiscardDialog;