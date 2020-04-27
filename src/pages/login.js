import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
//Mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.formStyles
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
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
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account ? sign up <Link to="/signup">here</Link>{" "}
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};
Login.defaultProps = {
  classes: {},
  loginUser: () => {},
  user: {},
  ui: {}
};
const mapStateToProps = state => ({
  user: state.user,
  UI: state.ui
});
const mapDispatchToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
