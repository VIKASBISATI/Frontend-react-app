import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import MyButton from "../../utils/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

//Mui
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//Icons
import ChatIcon from "@material-ui/icons/Chat";

//Redux
import { connect } from "react-redux";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative"
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objecFit: "cover"
  }
};
class Screams extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/users/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary"></ChatIcon>
          </MyButton>
          <span>{commentCount} comments</span>
          <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Screams.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};
const mapStateToProps = state => ({
  user: state.user,
  data: state.data
});

export default connect(mapStateToProps, null)(withStyles(styles)(Screams));
