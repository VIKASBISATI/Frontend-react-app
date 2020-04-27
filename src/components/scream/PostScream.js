import React, { Component } from "react";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
//Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
//Redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.formStyles,
  submitButton: {
    position: "relative",
    float: "right"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    top: "5%",
    left: "91%"
  }
});
class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {}
      });
    }
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {}
    });
  };
  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newScream = {
      body: this.state.body
    };
    this.props.postScream(newScream);
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <>
        <MyButton onClick={this.handleOpen} tip="Post a Scream!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
            tip="Close"
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                className={classes.textField}
                label="Scream"
                placeholder="Post Screams"
                helperText={errors.body}
                error={errors.body ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.ui
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
