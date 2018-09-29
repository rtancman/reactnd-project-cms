import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './Menu.css';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class Menu extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  }

  render(){
    const { classes, match } = this.props;

    return (
      <div>
        <div className="nav_bar">
          <div className="container">
              <h1><Link to='/'>Project CMS</Link></h1>
              <div className="nav_bar__menu">
                <IconButton 
                  size="medium" 
                  color="inherit" 
                  aria-label="Menu"
                  onClick={this.toggleDrawer('left', true)}
                >
                  <MenuIcon /> <span>Menu</span>
                </IconButton>
              </div>
              <div className="nav_bar__actions">    
                <Link to='/posts/create'>Create post</Link>
              </div>
          </div>
        </div>
        <SwipeableDrawer 
            open={this.state.left} 
            onClose={this.toggleDrawer('left', false)}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS} 
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer('left', false)}
              onKeyDown={this.toggleDrawer('left', false)}
            >
              <div style={{ width: '300px' }}>
                <List component="nav">
                  <ListItem button>
                    <ListItemText>
                      <Link to='/'>Home</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link to='/posts/create'>Create post</Link>
                    </ListItemText>
                  </ListItem>
                </List>
              </div>
            </div>
          </SwipeableDrawer>
      </div>
    )
  }
}

export default Menu;