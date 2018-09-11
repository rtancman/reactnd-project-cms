import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Category from 'components/category/Category'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const CategoryPage = (props) => {
  const { classes, match } = props;

  return (
    <div className={classes.root}>
      <h1>Category</h1>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Category categoryId={match.params.id} />
        </Grid>
      </Grid>
    </div>
  )
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryPage);