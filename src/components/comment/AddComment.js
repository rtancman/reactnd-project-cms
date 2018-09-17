import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import uuidv4 from 'uuid/v4'
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createCommentFetch } from './actions'

class AddComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
  }

  state = {
    id: this.props.id || uuidv4(),
    timestamp: Date.now(),
    title: '',
    body: '',
    author: '',
    parentId: this.props.postId,
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name
    this.setState({ [field]: value });
  }

  handleSubmit = () => {
    this.props.saveData(this.state)
  }

  render() {
    const { title, body, author } = this.state;
    const { isFetching } = this.props;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
      >
        <TextValidator
          fullWidth
          label="Author"
          onChange={this.handleChange}
          name="author"
          value={author}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          fullWidth
          label="Title"
          onChange={this.handleChange}
          name="title"
          value={title}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          fullWidth
          multiline={true}
          rows="5"
          label="Body"
          onChange={this.handleChange}
          name="body"
          value={body}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <Button 
          variant="contained" 
          type="submit"
          disabled={isFetching}
        >
          {isFetching && <CircularProgress size={20} />} Submit
        </Button>
      </ValidatorForm>
    );
  }
}

const mapStateToProps = ({createComment}) => {
  return {
    ...createComment
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (comment) => dispatch(createCommentFetch(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);

