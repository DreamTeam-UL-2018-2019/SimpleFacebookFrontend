import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { FormGroup } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './homepage.css';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            Description: '',
            Phone: '',
            FirstName: '',
            LastName: '',
            Status: '',
            Password: '',
            Mail: ''
        }
        this.test = this.test.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    static requestHeaders() {
        return { 'AUTHORIZATION': `Bearer ${sessionStorage.token}` }
    }

    componentWillMount() {
        if (sessionStorage.getItem("token")) {
            console.log("Call user feed");
        }
        else {
            this.setState({ redirect: true });
        }
    }

    componentDidMount(){
        var jwtDecode = require('jwt-decode');
        const token = sessionStorage.getItem("token");
        var user = jwtDecode(token).user;
        this.setState({
            Id: user.Id,
            Description: user.Description,
            Phone: user.Phone,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Status: user.Status,
            Password: user.Password,
            Mail: user.Mail
        })
    }


    saveChanges(){
        axios.post("https://localhost:44389/api/values/saveChanges/", this.state)
        .then(res => {
            sessionStorage.setItem("token", res.data.token);
            this.componentDidMount();
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    test = (id) => {
        console.log("id " + id)
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }
        return (
            <div>
                <Paper style={{marginTop: '20px'}}>
                    <FormGroup>  
                        <TextField id="FirstName" label="Imię: " value={this.state.FirstName} onChange={this.handleChange} name="FirstName"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <FormGroup>  
                        <TextField id="LastName" label="Nazwisko" value={this.state.LastName} onChange={this.handleChange} name="LastName"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <FormGroup>  
                        <TextField id="Mail" type="email" label="Email" value={this.state.Mail} onChange={this.handleChange} name="Mail"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <FormGroup>  
                        <TextField id="Password" type="password" label="Zmień hasło" value={this.state.Password} onChange={this.handleChange} name="Password"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <FormGroup>  
                        <TextField id="Phone" label="Telefon" value={this.state.Phone} onChange={this.handleChange} name="Phone"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <FormGroup>  
                        <TextField id="Description" label="Twój opis" value={this.state.Description} onChange={this.handleChange} name="Description"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <Button onClick={this.saveChanges} >Zapisz zmiany</Button>
                </Paper>
            </div>
        );
    };
}
export default UserProfile;