import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import moment from 'moment'
import './List.css'

const ListContent = (props) => {
  const { items } = props;

  return (
    <div className="list_content">
      {items.map((item) => (
        <div className="list_content__item" key={item.id}>
          <div className="list_content__item__title">
            <Link className="link" to={`/posts/${item.id}`}>{item.title}</Link>
          </div>
          <div className="list_content__item__info">
            <p>
              date { moment(item.timestamp).format('MM-DD-YYYY') } - in <Link className="link" to={`/category/${item.category}`}>{ item.category }</Link> - by <span className="list_posts__item__info--author">{ item.author }</span> 
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

ListContent.propTypes = {
  items: PropTypes.array.isRequired,
}

const List = (props) => {
  const { items } = props;

  return (
    <div className="list_content">
      {items.map((item) => (
        <div className="list_content__item list_content__item--category" key={item.path}>
          <div className="list_content__item__title">
            <Link className="link" to={`/category/${item.path}`}>{item.name}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
}

export { ListContent, List };