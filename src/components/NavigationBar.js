import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {logout} from '../actions/login'
import './Navigation.css'
class NavigationBar extends React.Component{
constructor(props){
  super()
}

  logout(e) {
    e.preventDefault();
    window.location.replace("/login");
    this.props.logout();
  }

  render(){
    const { isAuthenticated } = this.props.auth;

    

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
      <li><Link to="/player" style={{ color:'#fff' }}>PlayList</Link></li>
      <li><Link to="/login" style={{ color:'#fff' }}  onClick={this.logout.bind(this)}>Logout</Link></li>
        
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup" style={{ color:'#fff'}} >Sign up</Link></li>
        <li><Link to="/login" style={{ color:'#fff'}}>Login</Link></li>
      </ul>
    );


  
    return(
        <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Music</Link>
          </div>

          <div className="collapse navbar-collapse">
           { isAuthenticated ? userLinks : guestLinks }
          </div>
        </div>
      </nav>


    )
  }
}
NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout:PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps , {logout})(NavigationBar)