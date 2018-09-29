import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddPost from 'components/post/AddPost'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const PostAdminPage = (props) => {
  const { classes, match } = props;

  return (
    <div className="page_home">
      <div className="row">
        <div className="col-xs">
          <AddPost  />
        </div>
      </div>
    </div>
  )
}

PostAdminPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PostAdminPage);