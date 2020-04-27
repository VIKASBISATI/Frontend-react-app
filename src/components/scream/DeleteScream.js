import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
//Mui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
//Icons
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

//Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";
const styles = {
    deleteButton: { position: "absolute", left: "90%" }
};
class DeleteScream extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({
      open: false
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <MyButton
          tip="DeleteScream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutlineOutlinedIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          close={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete the scream??
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              DeleteScream
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired
};
const mapDispatchToProps = {
  deleteScream
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(DeleteScream));
