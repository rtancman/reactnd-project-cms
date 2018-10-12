import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListCategories from '../category/ListCategories'
import ListPosts from '../post/ListPosts'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

const Home = (props) => {
  const { classes } = props;

  return (
    <div className="page_home">
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <ListCategories />
        </div>
        <div className="col-xs-12 col-md-6">
          <ListPosts />
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);