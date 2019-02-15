import React, { Component } from 'react';
import { Segment, Button, Icon, Header, Grid, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import firebase from '../../../firebase';

const PASSWORD_LENGTH = 6;

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    isLoading: false,
  }

  handleInputChange = event => { this.setState({ [event.target.name]: event.target.value }); }

  handleInputError = errorName => (
    this.state.errors.some(error => error.message.toLowerCase().includes(errorName)) ? 'error' : ''
  )

  handleSubmit = e => {
    e.preventDefault();

    if (this.isFormValid()) {

      const {
        email,
        password,
        errors,
      } = this.state;

      this.setState({
        isLoading: true,
        errors: [],
      });

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            isLoading: false,
          });
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            errors: [{ message: error }],
          });
        });
    }
  }

  isFormEmpty = () => {
    const {
      email,
      password,
    } = this.state;

    return !(email && password);
  }

  isFormValid = () => {
    let errors = [];

    if (this.isFormEmpty()) {
      this.setState({
        errors: [...errors, { message: 'Fill in all the fields' }]
      });
      return false;
    } else if (!this.isPasswordValid()) {
      this.setState({
        errors: [...errors, { message: `Password must be at least ${PASSWORD_LENGTH} characters long` }]
      });
      return false;
    } else {
      return true;
    }
  }

  isPasswordValid = () => this.state.password.length >= 6;

  renderErrors = () => this.state.errors.map((error, index) => <p key={index}>{error.message}</p>);

  render() {
    const {
      email,
      password,
      errors,
      isLoading,
    } = this.state;

    return (
      <Grid
        textAlign='center'
        verticalAlign='middle'
        className='app'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as='h1'
            color='red'
            icon
            size='huge'
          >
            <Icon name='thumbs up outline' />
            VidGuesser
          </Header>

          <Form onSubmit={this.handleSubmit}>
            <Segment raised>
              <Form.Input
                name='email'
                icon='mail outline'
                iconPosition='left'
                type='email'
                placeholder='Email'
                value={email}
                onChange={this.handleInputChange}
                className={this.handleInputError('email')}
              />
              <Form.Input
                name='password'
                icon='lock'
                iconPosition='left'
                type='password'
                placeholder='Password'
                value={password}
                onChange={this.handleInputChange}
                className={this.handleInputError('password')}
              />

              <Button
                color='red'
                fluid
                disabled={isLoading}
                className={isLoading ? 'loading' : ''}
              >
                LOGIN
              </Button>
            </Segment>
          </Form>

          {errors.length > 0 &&
            <Message icon>
              <Icon name='exclamation circle' />
              {this.renderErrors()}
            </Message>
          }

          <Segment raised>
            <p>Don't have an account? <Link to='/signUp'>Sign Up</Link></p>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
