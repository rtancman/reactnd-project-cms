import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import uuidv4 from 'uuid/v4'
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
  },
});

class PostForm extends React.Component {
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
      console.log(this.state)
    }

    render() {
        const listCategories = [
          {
            value: 'react',
            label: 'react',
          },
          {
            value: 'redux',
            label: 'redux',
          },
          {
            value: 'udacity',
            label: 'udacity',
          },
        ];
        const { id, timestamp, title, body, author, category } = this.state;
        const { classes } = this.props;

        return (
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
          >
            <SelectValidator
                className={classes.textField}
                onChange={this.handleChange}
                name="category"
                value={category}
                validators={['required']}
                errorMessages={['this field is required']}
            >
              {listCategories.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </SelectValidator>
            <TextValidator
                fullWidth
                className={classes.textField}
                label="Author"
                onChange={this.handleChange}
                name="author"
                value={author}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <TextValidator
                fullWidth
                className={classes.textField}
                label="Title"
                onChange={this.handleChange}
                name="title"
                value={title}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <TextValidator
                fullWidth
                className={classes.textField}
                multiline={true}
                rows="10"
                label="Body"
                onChange={this.handleChange}
                name="body"
                value={body}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            <Button variant="contained" type="submit">Submit</Button>
          </ValidatorForm>
        );
    }
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
};

export default withStyles(styles)(PostForm);
