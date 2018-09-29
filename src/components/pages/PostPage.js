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
    <div className="content">
      <Post postId={match.params.id} />
    </div>
  )
}

PostPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostPage);