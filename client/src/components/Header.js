import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        //changes header content based on login status
        switch (this.props.auth) {
            //while app is waiting to check login status, show nothing
            case null:
                return;
            //if not logged in, show login with google
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>
            //if logged in, show add credits, amount of credits, and logout buttons
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="2" style={{ margin: '0 10px'}}>
                        Credits: {this.props.auth.credits}
                    </li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} className="left brand-logo">Feedback App</Link>
                    <ul className="right">
                        { this.renderContent() }
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);