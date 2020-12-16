import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Avatar} from "@material-ui/core";

const useStyles = (theme) => ({
  avatarSize: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "0px auto",
  },
  userName: {
    textAlign: "center",
  },
});

class UserAvataAndName extends Component {
  render() {
    const { classes, user} = this.props;
    return (
      <>
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          className={classes.avatarSize}
        />

        {user.name ? (
          <h2 className={classes.userName}>{user.name}</h2>
        ) : (
          <h2 className={classes.userName}>{user.email}</h2>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(
  withStyles(useStyles)(UserAvataAndName)
);
