import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListCategories from 'components/category/ListCategories'
import ListPosts from 'components/post/ListPosts'


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
    <div className={classes.root}>
      <h1>Home</h1>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <ListCategories />          
        </Grid>
        <Grid item xs={6}>
          <ListPosts />
        </Grid>
      </Grid>
    </div>
  )
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home);