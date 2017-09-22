import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if ( password.length < 9 ) {
      return this.setState({error: 'Password must be at least 8 characters'})
    }

    Accounts.createUser({email, password}, (err) => {
      err ? this.setState({error: err.reason}) : this.setState({error: ''});
    });
  }
  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : null}

          <form className='boxed-view__form' onSubmit={this.onSubmit} noValidate>
            <input type='email' ref='email' name='email' placeholder='Email'/>
            <input type='password' ref='password' name='password' placeholder='Password'/>
            <button className='button' type='submit'>Create account</button>
          </form>
          <Link to='/'>Already signed up?</Link>
        </div>
      </div>
    );
  }
};
