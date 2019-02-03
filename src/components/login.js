import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { FormGroup } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import './login.css';
import { PostData } from '../services/PostData';

class Login extends Component{
    
    constructor() {
        super();
        this.state = {
            mail: '',
            password: '',
            redirect: false,
            isError: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    login = e => {
        console.log("login");
        if(this.state.mail && this.state.password)
        {
            PostData('api/values/login', this.state)
            .then((result) => {
                if(result !== undefined){
                    console.log("Success login");
                    var responseJSON = result.token;
                    sessionStorage.setItem("token", responseJSON);
                    this.setState({redirect: true});
                }
                else{
                    console.log("Login or password is invalid.");
                    this.setState({isError: true});
                }
            })
        }
    }

    register = event => {
        this.props.history.push('/register')
    }

    render()
    {   
        if(this.state.redirect)
        {
            return (<Redirect to={'/home'} />)
        }

        if(sessionStorage.getItem("userData"))
        {
            return (<Redirect to={'/home'} />)
        }

        let information;
        if(this.state.isError)
        {
            information = <div>Login or password is invalid.</div>
        }

        return (
            <div className="Login">
                <form>
                    <FormGroup>
                        <TextField id="email-input" label="Email" type="email" name="mail"
                            value={this.state.mail} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <TextField id="password-input" label="Password" type="password" name="password"
                            value={this.state.password} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    {information}
                    <Button variant="outlined" color="secondary" onClick={this.login}> Sign in </Button>
                    <Button variant="raised" color="primary" onClick={this.register}> Sign up </Button>
                </form>
            </div>
        );
    
    };
}
export default Login;