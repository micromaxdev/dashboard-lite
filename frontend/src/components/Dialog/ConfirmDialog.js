import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmDialog = (props) => {
  const { title, content, open, setOpen, onConfirm, onCancel } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
          Yes
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onCancel();
          }}
          color="default"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
