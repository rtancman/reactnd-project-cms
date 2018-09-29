import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import pluralize from 'pluralize'
import ListComments from './ListComments'
import AddComment from './AddComment'
import './Comment.css'
const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Comment = (props) => {
  const { classes, items, postId } = props;
  let messageComment = (<p><span>Be the first to comment</span></p>)
  const itemsLength = items.length;

  if ( itemsLength >= 1){
    messageComment = (<p><span>{ itemsLength }</span> { pluralize('Comment', itemsLength) }</p>)
  }

  return (
    <div className="content__comment">
      <div className="content__comment__head">
        { messageComment }
      </div>
      <hr />
      <div className="content__comment__info">
        <p>Comments are the sole importance of the authors and do not represent an opinion of this site. If they denounce the terms of use, report. Read more frequently to find out what the animal is or illegal.</p>
      </div>
      <AddComment
        postId={postId}
      />
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