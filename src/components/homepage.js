import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import axios from 'axios';
import styled from 'styled-components';
import './login.css';
import { Button } from "@material-ui/core";

const navWidthCollapsed = 64;
//const navWidthExpanded = 280;
const Main = styled.main`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${navWidthCollapsed}px;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    background: ${props => (props.expanded ? 'rgba(0, 0, 0, .6)' : 'inherit')};
    transition: background-color .35s cubic-bezier(.4, 0, .2, 1);
`;

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

    renderBreadcrumbs() {
        //const { selected } = this.state;
        //const list = ensureArray(this.pageTitle[selected]);

        return (
            <Breadcrumbs>
                <div>
                    <Button variant="raised" color="secondary">test</Button>
                    <Button variant="raised" color="secondary"> test</Button>
                    <Button variant="raised" color="secondary">test</Button>
                    <Button variant="raised" color="secondary"> test</Button>
                    <Button variant="raised" color="secondary">test</Button>
                    <Button variant="raised" color="secondary"> test</Button>
                    <Button variant="raised" color="secondary">test</Button>
                    <Button variant="raised" color="secondary"> test</Button>
                </div>
            </Breadcrumbs>
        );
    }

    render()
    {   
        if(this.state.redirect)
        {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div>

            
            <div>
                <style> { `body {background-image: url("img/Retro.jpg");}` } </style>
                {/* don't delete!! https://reactjsexample.com/react-side-nav-component/ this is link to settings to SideNav*/}
                <SideNav style={{background: 'green', marginLeft:'50px'}}
                        onSelect={(selected) => {
                            // const to = '/' + selected;
                            // if (location.pathname !== to) {
                            //     history.push(to);
                            // }
                            if(selected === 'logout')
                            {
                                this.logout();
                            }
                        }}>
                    <SideNav.Toggle/>
                    <SideNav.Nav defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <i class="material-icons">home</i>
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <i class="material-icons">settings</i>
                            </NavIcon>
                            <NavText>
                                Settings
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="logout">
                            <NavIcon>
                                <i class="material-icons">power_settings_new</i>
                            </NavIcon>
                            <NavText>
                                Logout
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Main>
                    {this.renderBreadcrumbs()}
                </Main>
                </div>
                </div>
        );
    };
}
export default HomePage;