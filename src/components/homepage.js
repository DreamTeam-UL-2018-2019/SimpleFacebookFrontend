import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { Button} from "@material-ui/core";
import axios from 'axios';
import './login.css';

class HomePage extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            redirect: false
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
            <div className="HomePage">
              Witaj na stronie głównej
              <Button variant="raised" color="primary" onClick={this.logout}> Logout </Button>
              <Button variant="raised" color="secondary" onClick={this.test}> Test </Button>
            </div>
          );
    };
}
export default HomePage;