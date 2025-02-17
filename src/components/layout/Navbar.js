import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MyButton from "../../utils/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
//Mui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//Icons
import HomeIcon from "@material-ui/icons/Home";
//Redux
import { connect } from "react-redux";
class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <PostScream />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon color="primary" />
                </MyButton>
              </Link>
              <Notifications />
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
export default connect(mapStateToProps)(Navbar);
