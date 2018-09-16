import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import uuidv4 from 'uuid/v4'
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
  },
});

class PostForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    created: PropTypes.bool.isRequired,
  }

  state = {
    id: this.props.id || uuidv4(),
    timestamp: Date.now(),
    title: '',
    body: '',
    author: '',
    category: '',
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name
    this.setState({ [field]: value });
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state)
  }

  render() {
    const { title, body, author, category } = this.state;
    const { categories, isFetching } = this.props;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
      >
        <SelectValidator
          onChange={this.handleChange}
          name="category"
          value={category}
          validators={['required']}
          errorMessages={['this field is required']}
        >
          {categories.map(option => (
            <MenuItem key={option.path} value={option.path}>
              {option.name}
            </MenuItem>
          ))}
        </SelectValidator>
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
          rows="10"
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

export default withStyles(styles)(PostForm);