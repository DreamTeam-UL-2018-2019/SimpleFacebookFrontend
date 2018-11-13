import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { FormGroup } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { PostData } from '../services/PostData';
import './register.css';

class Register extends Component {
    constructor(){
        super();
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false,
            isError: false
        }
        this.signup = this.signup.bind(this);
    }

    signup = e => {
        if(this.state.email && this.state.password)
        {
            PostData('api/values/register', this.state)
            .then((result) => {
                if(result !== undefined){
                    console.log("Success register")
                    let responseJSON = result.token;
                    sessionStorage.setItem('token', responseJSON);
                    this.setState({redirect: true});
                }
                else{
                    console.log("All fields is required");
                    this.setState({isError: true});
                }
            })
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
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

        return(
            <div className="Register">
                <header>
                    Register
                </header>
                <form>
                    <FormGroup>
                        <TextField id="firstName-input" label="First name" type="firstName" name="firstName"
                            value={this.state.firstName} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <TextField id="lastName-input" label="Last name" type="lastName" name="lastName"
                            value={this.state.lastName} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <TextField id="email-input" label="Email" type="email" name="email"
                            value={this.state.email} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <TextField id="password-input" label="Password" type="password" name="password"
                            value={this.state.password} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <TextField id="confirmPassword-input" label="Confirm password" type="password" name="confirmPassword"
                            value={this.state.confirmPassword} margin="normal" variant="outlined"
                            onChange={this.handleChange} />
                    </FormGroup>
                    {information}
                    <Button variant="outlined" color="secondary" onClick={this.signup}> Register </Button>
              </form>
            </div>
        );
    }
}
export default Register;