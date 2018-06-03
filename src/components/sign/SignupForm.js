import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames'
// import TextFieldGroup from '../common/TextFieldGroup'

class SignupForm extends React.Component {

    constructor(props,context) {
        super()
        this.state = {
            username: '',
            password: '',
            isLoading: false
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
        this.props.userSignupRequest(this.state).then(
            () => { 
                this.context.router.history.push('/login')
             },
            ({ data }) => this.setState({ isLoading: false })
        )
    }

    render() {
        return (
            <div className="wrapper">
            <form onSubmit={this.onSubmit} >
                <h1>Join our community</h1>

                {/* <TextFieldGroup

                    label="Username"
                    onChange={this.onChange}

                    value={this.state.username}
                    field="username"
                    
                />

                <TextFieldGroup
                    
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                    
                /> */}

                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input type="text" value={this.state.username} placeholder="Enter username" name="username" className="form-control" onChange={this.onChange} required />

                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input type="password" value={this.state.password} placeholder="Enter password" name="password" className="form-control" onChange={this.onChange} required />

                </div>
                <div className={classnames('form-group', 'signupButtons')} >
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                        Sign up
              </button>

                </div>

            </form>
            </div>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}
SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
  }

export default SignupForm