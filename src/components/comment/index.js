import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListComments from './ListComments'
import AddComment from './AddComment'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Comment = (props) => {
  const { classes, items, postId } = props;

  return (
    <div className={classes.root}>
      <ListComments 
        items={items}
      />
      <AddComment
        postId={postId}
      />
    </div>
  )
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  items: PropTypes.array
}

export default withStyles(styles)(Comment);