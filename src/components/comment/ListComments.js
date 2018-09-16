import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const ListComments = (props) => {
  const { classes, items } = props;

  return (
    <div className={classes.root}>
      <p>comments</p>
      {items && items.map((comment) => (
        <p key={comment.id}>{comment.body}</p>
      ))}
    </div>
  )
}

ListComments.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
}

export default withStyles(styles)(ListComments);