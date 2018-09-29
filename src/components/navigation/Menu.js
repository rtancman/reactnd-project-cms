import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './Menu.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Menu = (props) => {
  const { classes, match } = props;

  return (
    <div className="nav_bar">
      <div className="container">
          <h1><Link to='/'>Project CMS</Link></h1>
          <div className="nav_bar__menu">
            <IconButton size="medium" color="inherit" aria-label="Menu">
              <MenuIcon /> <span>Menu</span>
            </IconButton>
          </div>
          <div className="nav_bar__actions">    
            <Link to='/posts/create'>Create post</Link>
          </div>
      </div>
    </div>
  )
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Menu);