import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {login } from '../../actions/login'
import './login.css'
import classnames from 'classnames'
class LoginForm extends React.Component{
   
    constructor(props,context) {
        super()
        this.state = {
            username: '',
            password: '',
            isLoading:false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()
        this.setState({ isLoading: true })
        this.props.login(this.state).then(
            () => { 
                this.context.router.history.push('/player')
             },
            ({ data }) => this.setState({ isLoading: false })
        )
        
        
    }


    render(){
        return(
            <div className="wrapper">
             <form onSubmit={this.onSubmit}>
             <h1>Login</h1>
                 <div className="form-group">
                    <label className="control-label">Username</label>
                    <input type="text" value={this.state.username} placeholder="Enter Username" name="username" className="form-control" onChange={this.onChange} required/>

                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" value={this.state.password} placeholder="Enter password" name="password" className="form-control" onChange={this.onChange} required />

                </div>
                <div className={classnames('form-group', 'signupButtons')}>
                    <button className="btn btn-primary btn-lg" disabled={this.state.isLoading}>
                        Login
              </button>

                </div>
                 </form>
                 </div>
        )
    }
}

LoginForm.propTypes={
    login:PropTypes.func.isRequired
} 
LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
  }

export default connect(null, {login})(LoginForm)