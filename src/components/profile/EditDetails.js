import React, { Component } from "react";
import PropTypes from "prop-types";

//Mui
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = theme => ({
  ...theme.profile,
  button:{
      float: "right"
  }
});

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    open: false
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({
      open: false
    });
  };
  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio || "",
      website: credentials.website || "",
      location: credentials.location || ""
    });
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <>
        <Tooltip title="Edit Details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                className={classes.textField}
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                className={classes.textField}
                label="Website"
                placeholder="Your personal/professional website"
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                className={classes.textField}
                label="Location"
                placeholder="Where you live"
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  credentials: state.user.credentials
});
const mapDispatchToProps = {
  editUserDetails
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditDetails));
