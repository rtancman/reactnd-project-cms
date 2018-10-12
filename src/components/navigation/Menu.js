import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import './Menu.css';
import Search from '../search'

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

class Menu extends Component {
  static propTypes = {
    classes: PropTypes.object,
    categories: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
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

  makeListSearch(){
    const listPosts = this.props.posts.items.map((p) => {return {name: p.title, path: `/${p.category}/${p.id}`}})
    const listCategories = this.props.categories.items.map((c) => {return {name: c.name, path: `/${c.path}`}})
    return [...listCategories, ...listPosts]
  }

  render(){
    const { categories } = this.props;
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
                <Search 
                  options={this.makeListSearch()}
                />
              </div>
          </div>
        </div>
        <SwipeableDrawer 
            open={this.state.left}
            onOpen={() => {}}
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
                      <Link className='link' to='/'>Home</Link>
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemText>
                      <Link className='link' to='/posts/create'>Create post</Link>
                    </ListItemText>
                  </ListItem>
                </List>
                {categories.items && (
                  <div>
                    <Divider />
                    <List component="nav">
                      {categories.items.map((item) => (
                        <ListItem key={`menu${item.path}`} button>
                          <ListItemText>
                            <Link className="link" to={`/${item.path}`}>{item.name}</Link>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}
              </div>
            </div>
          </SwipeableDrawer>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts
  };
};

export default connect(mapStateToProps)(Menu);