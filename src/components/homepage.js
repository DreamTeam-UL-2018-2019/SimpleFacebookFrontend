import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { Button } from "@material-ui/core";
import SlideMenu from 'react-slide-menu'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import axios from 'axios';
import './login.css';

class HomePage extends Component{
    constructor(props) 
    {
        super(props);
        this.state = {
            redirect: false,
            slideMenuActive: false,
        }
        this.logout = this.logout.bind(this);
        this.test = this.test.bind(this);
        this.menuIsOpen = this.menuIsOpen.bind(this);
    }

    static requestHeaders() {
        return {'AUTHORIZATION': `Bearer ${sessionStorage.token}`}
      }

    componentWillMount(){
        if(sessionStorage.getItem("token"))
        {
            console.log("Call user feed");
        }
        else{
            this.setState({redirect: true});
        }
    }

    logout(){
        sessionStorage.setItem("token",'');
        sessionStorage.clear();
        this.setState({redirect: true});
        console.log("Logout.")
    }

    test(){
        const token = sessionStorage.getItem("token");
        console.log("Pobrany token");
        console.log(token);
        const headers = {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
        };
                
        axios.get("http://localhost:50882/api/values/test", headers)
            .then(res => {
                console.log(res);
            })
    }

    menuIsOpen(){
        this.setState({slideMenuActive: true})
    }

    closeMenu(){
        this.setState({menuOpen: false});
    }

    render()
    {   
        if(this.state.redirect)
        {
            return (<Redirect to={'/login'} />)
        }
        
        var nav = [
            {id: 'home', label: 'Home', path: '/'},
            {id: 'about', label: 'About', path: '/about'},
            {id: 'discover', label: 'Discover', path: '/discover'},
        ]

        return (
            // <SlideMenu active={this.state.slideMenuActive} nav={nav} closeMenu={() => this.setState({slideMenuActive: false})}>
            //     <div>
            //         <style> { `body {background-image: url("img/Retro.jpg");}` } </style>
            //         <Button onClick={this.menuIsOpen}>
            //             Open Ham
            //         </Button>
            //     </div>
            // </SlideMenu>
            <SideNav
                onSelect={(selected) => {
                    // const to = '/' + selected;
                    // if (location.pathname !== to) {
                    //     history.push(to);
                    // }
                }}>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="devices">
                        <NavIcon>
                            <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Devices
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
                {/* https://reactjsexample.com/react-side-nav-component/ */}
            </SideNav>
        );
    };
}
export default HomePage;