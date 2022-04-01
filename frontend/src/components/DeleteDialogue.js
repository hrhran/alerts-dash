import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import axios from "axios";

export const DeleteDialogue = ({ setDeleteModal, val }) => {
  const handleClickOpen = async () => {
    await axios
      .delete(`/delete/${val._id}`)
      .then(() => {
        setDeleteModal(false);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Can't Delete data there is some issue at server side")
      });
  };

  const handleClose = () => {
    setDeleteModal(false);
  };
  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle style={{color:"red"}}>Deletion Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText style={{fontWeight:"bold"}}>
            Do you really want to delete the data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClickOpen} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
