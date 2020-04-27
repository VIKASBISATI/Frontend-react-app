import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { signupUser } from "../redux/actions/userActions";

//Mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  ...theme.formStyles
});
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword:"",
      handle:"",
      loading: false,
      errors: ""
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors: nextProps.UI.errors
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const { classes, loading } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              className={classes.textField}
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              className={classes.textField}
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="Password"
              className={classes.textField}
              label="ConfirmPassword"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              className={classes.textField}
              label="Handle"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an account ? sign in <Link to="/login">here</Link>{" "}
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};
Signup.defaultProps = {
  classes: {},
  loginUser: ()=>{},
  user: {},
  ui: {}
};
const mapStateToProps=(state)=>({
  user: state.user,
  UI: state.ui
})
const mapDispatchToProps = {
  signupUser
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Signup));
