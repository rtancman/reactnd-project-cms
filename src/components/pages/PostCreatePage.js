import React from 'react';
import AddPost from '../post/AddPost'

const PostCreatePage = (props) => {
  return (
    <div className="page_home">
      <div className="row">
        <div className="col-xs">
          <AddPost />
        </div>
      </div>
    </div>
  )
}

export default PostCreatePage;