import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Post = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <h1>Post</h1>
      <Grid container spacing={24}>
      </Grid>
    </div>
  )
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Post);