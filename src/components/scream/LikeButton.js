import React, { Component } from "react";
import MyButton from "../../utils/MyButton";
import PropTypes from "prop-types";
//Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.screamId
      )
    ) {
      return true;
    } else {
      return false;
    }
  };
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };
  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const {
      user: { authenticated }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="like">
        <FavoriteBorderIcon
          color="primary"
          onClick={() => {
            window.location.href = "/login";
          }}
        />
      </MyButton>
    ) : this.likedScream() ? (
      <MyButton tip="Unlike">
        <FavoriteIcon color="primary" onClick={this.unlikeScream} />
      </MyButton>
    ) : (
      <MyButton tip="like">
        <FavoriteBorderIcon color="primary" onClick={this.likeScream} />
      </MyButton>
    );
    return likeButton;
  }
}
LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user,
  data: state.data
});
const mapDispatchToProps = {
  likeScream,
  unlikeScream
};
export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
