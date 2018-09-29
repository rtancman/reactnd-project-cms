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
    <div className="content__comment">
      <div class="content__comment__head">
        <p><span>{ items.length }</span> Comments</p>
      </div>
      <hr />
      <div class="content__comment__info">
        <p>Comments are the sole importance of the authors and do not represent an opinion of this site. If they denounce the terms of use, report. Read more frequently to find out what the animal is or illegal.</p>
      </div>
      <AddComment
        postId={postId}
      />
      <hr />
      <ListComments 
        items={items}
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