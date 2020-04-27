import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//Mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  ...theme.profile,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  },
  commentData: {
    marginLeft: 20
  }
});
class Comments extends Component {
  render() {
    const { classes, comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <>
              <hr className={classes.visibleSeperator} />
              <Grid item sm={12} key={index}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="profile"
                      className={classes.commentImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/user/${userHandle}`}
                        color="primary"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {/* {index !== comments.length - 1 && (
                <hr className={classes.visibleSeperator} />
              )} */}
            </>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Comments);
