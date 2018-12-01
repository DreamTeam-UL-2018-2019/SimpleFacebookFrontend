import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
//import { Grid, Paper} from "@material-ui/core";
import axios from 'axios';
import './login.css';


class HomePage extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            redirect: false,
            color: 'red'
        }
        this.logout = this.logout.bind(this);
        this.test = this.test.bind(this);
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

    render()
    {   
        if(this.state.redirect)
        {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div>
                <style> { `body {background-image: url("img/Retro.jpg");}` } </style>
            </div>
        );
    };
}
export default HomePage;