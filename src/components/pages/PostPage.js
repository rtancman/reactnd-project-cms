import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Post from '../post/Post'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const PostPage = (props) => {
  const { classes, match, history } = props;

  return (
    <div className="content">
      <Post 
        history={history} 
        postId={match.params.id} 
        caregoryPath={match.params.category}
      />
    </div>
  )
}

PostPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostPage);