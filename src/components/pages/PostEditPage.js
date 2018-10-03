import React from 'react';
import EditPost from 'components/post/EditPost'

const PostAdminPage = (props) => {
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

export default PostAdminPage;