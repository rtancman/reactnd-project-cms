import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import uuidv4 from 'uuid/v4'
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ShowMessage } from 'components/layout/Message.js'

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
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
  }

  state = {
    id: this.props.id || uuidv4(),
    timestamp: this.props.timestamp || Date.now(),
    title: this.props.title || '',
    body: this.props.body || '',
    author: this.props.author || '',
    category: this.props.category || '',
  }

  reset() {
    this.setState((state) => ({
      id: this.props.id || uuidv4(),
      timestamp: Date.now(),
      title: '',
      body: '',
      author: '',
      category: '',
    }))
  }

  handleChange = (event) => {
    const value = event.target.value;
    const field = event.target.name
    this.setState({ [field]: value });
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state, () => this.reset())
  }

  render() {
    const { title, body, author, category } = this.state;
    const { categories, isFetching, created, didInvalidate } = this.props;

    return (
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmit}
      >
        { isFetching === false && created === true && ( <ShowMessage message='Post has been created' variant='success' open={true} /> ) }
        { isFetching === false && didInvalidate === true && ( <ShowMessage message='Error to create Post. Try Again!' variant='error' open={true} /> ) }
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
          margin="normal"
        />
        <TextValidator
          fullWidth
          label="Title"
          onChange={this.handleChange}
          name="title"
          value={title}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
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
          variant="outlined"
          margin="normal"
        />
        <Button 
          variant="contained" 
          type="submit"
          disabled={isFetching}
          margin="normal"
        >
          {isFetching && <CircularProgress size={20} />} Save
        </Button>
      </ValidatorForm>
    );
  }
}

export default withStyles(styles)(PostForm);
