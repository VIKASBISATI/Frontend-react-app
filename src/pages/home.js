import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Screams from "../components/scream/Screams";
import Profile from "../components/profile/Profie";
//Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";
class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream, index) => (
        <Screams scream={scream} key={scream.screamId} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});
const mapDispatchToProps = {
  getScreams
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
