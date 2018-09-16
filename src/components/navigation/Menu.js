import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Menu = (props) => {
  const { classes, match } = props;

  return (
    <div className={classes.root}>
      <h2>Actions</h2>
      <Link to='/'>Home</Link>
      <Link to='/posts/create'>Create post</Link>
    </div>
  )
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Menu);



