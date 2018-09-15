import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PostForm from 'components/post/PostForm'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const PostAdminPage = (props) => {
  const { classes, match } = props;

  return (
    <div className={classes.root}>
      <h1>Post</h1>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <PostForm  />
        </Grid>
      </Grid>
    </div>
  )
}

PostAdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostAdminPage);