import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Post from 'components/post/Post'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const PostPage = (props) => {
  const { classes, match } = props;

  return (
    <div className={classes.root}>
      <h1>Post</h1>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Post postId={match.params.id} />
        </Grid>
      </Grid>
    </div>
  )
}

PostPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostPage);