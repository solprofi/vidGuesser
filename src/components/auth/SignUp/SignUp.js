import React, { Component } from 'react';
import { Segment, Button, Icon, Header, Grid, Form, Message } from 'semantic-ui-react';
import md5 from 'md5';
import { Link } from 'react-router-dom';

import firebase from '../../../firebase';

const PASSWORD_LENGTH = 6;

export default class SignUp extends Component {
  state = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
    isLoading: false,
    usersRef: firebase.database().ref('users'),
  }

  arePasswordsSame = () => this.state.password === this.state.confirmPassword;

  handleInputChange = event => { this.setState({ [event.target.name]: event.target.value }); }

  handleInputError = errorName => (
    this.state.errors.some(error => error.message.toLowerCase().includes(errorName)) ? 'error' : ''
  )

  handleSubmit = e => {
    e.preventDefault();

    if (this.isFormValid()) {
      console.log('Form is valid')

      const {
        userName,
        email,
        password
      } = this.state;

      this.setState({
        isLoading: true,
        errors: [],
      });

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(createdUser => {
          const { user } = createdUser;

          user.updateProfile({
            displayName: userName,
            photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d=identicon`
          })
            .then(() => {
              this.saveUser(user)
                .then(() => {
                  this.setState({
                    isLoading: false,
                  });
                });
            })
            .catch(error => {
              this.setState({
                errors: [{ message: error }],
                isLoading: false,
              });
            });
        })
        .catch(error => {
          this.setState({
            errors: [{ message: error }],
            isLoading: false,
          });
        });
    }
  }

  isFormEmpty = () => {
    const {
      userName,
      email,
      password,
      confirmPassword,
    } = this.state;

    return !(userName && email && password && confirmPassword);
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
    } else if (!this.arePasswordsSame()) {
      this.setState({
        errors: [...errors, { message: `Passwords must match` }]
      });
    } else {
      return true;
    }
  }

  isPasswordValid = () => this.state.password.length >= 6;

  renderErrors = () => this.state.errors.map((error, index) => <p key={index}>{error.message}</p>);

  saveUser = user => {
    return this.state.usersRef
      .child(user.uid)
      .set({
        name: user.displayName,
        avatar: user.photoURL,
      });
  }

  render() {
    const {
      userName,
      email,
      password,
      confirmPassword,
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
            <Icon name='youtube' />
            VidGuesser
          </Header>

          <Form onSubmit={this.handleSubmit}>
            <Segment raised>
              <Form.Input
                name='userName'
                icon='user circle'
                iconPosition='left'
                type='text'
                placeholder='Username'
                value={userName}
                onChange={this.handleInputChange}
              />
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
              <Form.Input
                name='confirmPassword'
                icon='redo alternate'
                iconPosition='left'
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={this.handleInputChange}
                className={this.handleInputError('password')}
              />

              <Button
                color='red'
                fluid
                disabled={isLoading}
                className={isLoading ? 'loading' : ''}
              >
                SUBMIT
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
            <p>Already a user? <Link to='/login'>Login</Link></p>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
