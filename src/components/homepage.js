import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import axios from 'axios';
import Groups from './groups.js';
import UserProfile from './userProfile.js';
import ChatApp from './ChatApp';
import './homepage.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            slideMenuActive: false,
            expanded: false,
            userGroup: [],
            selectNav: 'home',
        }
        this.logout = this.logout.bind(this);
        this.test = this.test.bind(this);
        this.menuIsOpen = this.menuIsOpen.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    static requestHeaders() {
        return { 'AUTHORIZATION': `Bearer ${sessionStorage.token}` }
    }

    componentWillMount() {
        if (sessionStorage.getItem("token")) {
            console.log("Call user feed");
            this.getUserGroup();
        }
        else {
            this.setState({ redirect: true });
        }
    }

    getUserGroup() {
        var jwtDecode = require('jwt-decode');
        const token = sessionStorage.getItem("token");

        var user = jwtDecode(token).user;
        console.log(user);
        axios.get("https://localhost:44389/api/values/group/" + user.Id)
            .then(res => {
                this.setState({ userGroup: res.data });
                console.log(this.state.userGroup);
            });
    }

    logout() {
        sessionStorage.setItem("token", '');
        sessionStorage.clear();
        this.setState({ redirect: true });
        console.log("Logout.")
    }

    test = (id) => {
        console.log("id " + id)
    }

    onToggle = (expanded) => {
        console.log("działa");
        this.setState({ expanded: expanded });
    };

    menuIsOpen() {
        this.setState({ slideMenuActive: true })
    }

    closeMenu() {
        this.setState({ menuOpen: false });
    }

    toChat() {
        window.location = './public/chatwindow.html';
    }

    onSelect = (x) =>
    {   
        this.setState({selectNav: x})
        console.log("select: ", this.state.selectNav);
    }

    render() {
        const expanded = this.state.expanded;
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        if(this.state.selectNav === 'group')
        {
            return (
                <div>
                    <div className="Paper" style={{ marginLeft: expanded ? 240 : 'auto' }}>
                        <Groups />
                    </div>
                    <SideNav onToggle={this.onToggle} onSelect={this.onSelect}>
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="group" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-device1" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Your groups
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="chat" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Chat
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logout" onSelect={this.logout} >
                                <NavIcon>
                                    <i className="fa fa-fw fa-logout" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Logout
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                        {/* https://reactjsexample.com/react-side-nav-component/ */}
                    </SideNav>
                </div>
            );
        }
        else if (this.state.selectNav === 'home'){
            return (
                <div>
                    <div className="Paper" style={{ marginLeft: expanded ? 240 : 'auto' }}>
                        <UserProfile />
                    </div>
                    <SideNav onToggle={this.onToggle} onSelect={this.onSelect}>
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="group" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-device1" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Your groups
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="chat" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Chat
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logout" onSelect={this.logout} >
                                <NavIcon>
                                    <i className="fa fa-fw fa-logout" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Logout
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                        {/* https://reactjsexample.com/react-side-nav-component/ */}
                    </SideNav>
                </div>
            );
        }
        else if (this.state.selectNav === 'chat'){
            return (
                <div>
                    <div className="Paper" style={{ marginLeft: expanded ? 240 : 'auto' }}>
                        <div className="container"><ChatApp ></ChatApp></div>
                    </div>
                    <SideNav onToggle={this.onToggle} onSelect={this.onSelect}>
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="group" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-device1" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Your groups
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="chat" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Chat
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logout" onSelect={this.logout} >
                                <NavIcon>
                                    <i className="fa fa-fw fa-logout" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Logout
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                        {/* https://reactjsexample.com/react-side-nav-component/ */}
                    </SideNav>
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <div className="Paper" style={{ marginLeft: expanded ? 240 : 'auto' }}>
                        <button>dobrze jest</button>
                    </div>
                    <SideNav onToggle={this.onToggle} onSelect={this.onSelect}>
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="group" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-device1" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Your groups
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="chat" >
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Chat
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logout" onSelect={this.logout} >
                                <NavIcon>
                                    <i className="fa fa-fw fa-logout" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Logout
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                        {/* https://reactjsexample.com/react-side-nav-component/ */}
                    </SideNav>
                </div>
            );
        }
    };
}
export default HomePage;