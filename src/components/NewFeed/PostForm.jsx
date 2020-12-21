import React, { useState } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    marginBottom: "20px",
  },
});

const PostForm = (props) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);

  const { classes } = props;

  const handleNewPostOnChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handlePictureChangeFor = (e) => {
    let fileCollection = [];
    Array.from(e.target.files).map((f) => fileCollection.push(f));
    setFile(fileCollection);
    console.log(file);
    // setFile(e.target.files[0]);
  };

  const handleSubmitForm = () => {
    console.log(text, file);
    props.dispatch({
      type: "ADD_POST",
      payload: {
        text: text,
        file: file,
        time: new Date(),
      },
    });
  };
  console.log(file);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={9}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              placeholder="What do you think?"
              variant="outlined"
              fullWidth
              onChange={handleNewPostOnChange}
            />
            <input
              type="file"
              multiple
              onChange={handlePictureChangeFor}
              accept="image/*"
            />
            <Typography variant = "caption">* Limited 5 pictures.</Typography>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={handleSubmitForm}>Post</Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(PostForm));
