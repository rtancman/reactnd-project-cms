import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { debounce } from 'throttle-debounce';
import { withRouter } from 'react-router-dom'
import './Search.css'

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Search extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    options: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,  
  }

  state = {
    query: '',
    items: [],
    open: true,
  }

  onSearchDebounced = debounce(200, this.onSearch)

  onSearch(query){
    if (query.length > 3) {
      this.setState((state) => ({
        open: true,
        items: this.props.options.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()))
      }))
    }else{
      this.setState((state) => ({
        open: false,
        items: []
      }))
    }
  }

  updateQuery(query){
    this.setState(
      { query },
      () => this.onSearchDebounced(this.state.query.trim())
    )
  }

  onClickItem(path){
    this.setState(
      { 
        query: '',
        open: false,
        items: []
      },
      () => this.props.history.push(path)
    )
  }

  render() {
    const { classes } = this.props
    const { anchorEl, open, items, query } = this.state;
    const id = open ? 'simple-popper' : null;

    return(
      <div className="search__bar">
        <div className="search__bar__input" className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Input
            name='query'
            placeholder="Search…"
            disableUnderline
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
        <div className="search__bar__result">
          <Paper className="search__bar__result__box">
            {items && items.map((item) => (
              <ListItem key={`menu${item.path}`} button>
                <ListItemText onClick={() => this.onClickItem(item.path)}>
                  <span className="link">{item.name}</span>
                </ListItemText>
              </ListItem>
            ))}
          </Paper>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Search));