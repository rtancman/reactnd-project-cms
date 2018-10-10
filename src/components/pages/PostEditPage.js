import React from 'react';
import PropTypes from 'prop-types';
import EditPost from 'components/post/EditPost'

const PostEditPage = (props) => {
  const { match } = props

  return (
    <div className="page_home">
      <div className="row">
        <div className="col-xs">
          <EditPost postId={match.params.id} />
        </div>
      </div>
    </div>
  )
}

PostEditPage.propTypes = {
  match: PropTypes.object.isRequired,
}

export default PostEditPage;