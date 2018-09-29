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
    body: '',
    author: '',
    parentId: this.props.postId,
  }

  reset() {
    this.setState((state) => ({
      id: this.props.id || uuidv4(),
      timestamp: Date.now(),
      body: '',
      author: '',
      parentId: this.props.postId,
    }))
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name
    this.setState({ [field]: value });
  }

  handleSubmit = () => {
    this.props.saveData(this.state)
    this.reset()
  }

  render() {
    const { body, author } = this.state;
    const { isFetching } = this.props;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-lg-3">
            <div className="box">
              <TextValidator
                fullWidth
                label="Author"
                onChange={this.handleChange}
                name="author"
                value={author}
                validators={['required']}
                errorMessages={['this field is required']}
                margin="normal"
                variant="outlined"
              />
            </div>
          </div>
          <div className="col-xs-12 col-lg-7">
            <div className="box">
              <TextValidator
                fullWidth
                multiline
                label="Comment"
                onChange={this.handleChange}
                name="body"
                value={body}
                validators={['required']}
                errorMessages={['this field is required']}
                margin="normal"
                variant="outlined"
              />
            </div>
          </div>
          <div className="col-xs-12 col-lg-2">
            <div className="box">
              <Button 
                variant="contained" 
                type="submit"
                disabled={isFetching}>
                {isFetching && <CircularProgress size={20} />} Send
              </Button>
            </div>
          </div>
        </div>
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

