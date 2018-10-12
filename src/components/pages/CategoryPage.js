import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Category from '../category/Category'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const CategoryPage = (props) => {
  const { classes, match } = props;

  return (
    <div className="content">
      <Category categoryId={match.params.id} />
    </div>
  )
}

CategoryPage.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryPage);