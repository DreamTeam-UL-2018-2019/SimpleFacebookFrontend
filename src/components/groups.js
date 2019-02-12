import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Button, TextField } from "@material-ui/core";
import { FormGroup } from 'reactstrap';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import {withRouter} from 'react-router-dom'

import axios from 'axios';
import './homepage.css';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            userGroup: [],
            groupName: "",
            userId: '',
            groupId: '',
            groupRedirect: false,
            groupUrl: ''
        }
        //this.test = this.test.bind(this);
        this.addNewGroup = this.addNewGroup.bind(this);
        this.openChat = this.openChat.bind(this);
    }

    static requestHeaders() {
        return { 'AUTHORIZATION': `Bearer ${sessionStorage.token}` }
    }

    componentWillMount() {
        if (sessionStorage.getItem("token")) {
            console.log("Call user feed");
            var jwtDecode = require('jwt-decode');
            const token = sessionStorage.getItem("token");
            var user = jwtDecode(token).user;
            this.setState({userId: user.Id});
            this.getUserGroup();
        }
        else {
            this.setState({ redirect: true });
        }
    }

    addNewGroup(){
        var jwtDecode = require('jwt-decode');
        const token = sessionStorage.getItem("token");

        var user = jwtDecode(token).user;
        console.log("groupName: " + user);
        axios.post("https://localhost:44389/api/values/newGroup/" + user.Id, {Name: this.state.groupName})
            .then(res => {
                this.getUserGroup();
                this.setState({groupName: ""});
            });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
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

    openChat = (id, event) => {
        console.log('id grup: ', id);
        console.log("Id user");
        console.log(this.state.userId);
        var string = '/chat/' + id + '/' + this.state.userId;
        this.setState({groupRedirect: true});
        this.props.history.push(string);
    }

    deleteGroup = (id) => {
        var jwtDecode = require('jwt-decode');
        const token = sessionStorage.getItem("token");
        var user = jwtDecode(token).user;

        axios.delete('https://localhost:44389/api/values/delete/' + id + '/' + user.Id)
            .then(res => {
                this.getUserGroup();
            }
            );
    }

    render() {

        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        if(this.state.redirectGroup)
        {
            return (<Redirect to={this.state.groupUrl} />)
        }

        return (
            <div>
                <Paper style={{marginTop: '20px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Nazwa grupy</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.userGroup.map(group => (
                                <TableRow key={group.id}>
                                    <TableCell style={{ width: '80%' }} component="th">
                                        {group.name}
                                    </TableCell>
                                    <TableCell style={{ width: '20%' }} align="right">
                                        <Button onClick={() => this.openChat(group.id)}>Chat</Button>
                                    </TableCell>
                                    <TableCell style={{ width: '20%' }} align="right">
                                        <Button onClick={() => this.deleteGroup(group.id)}>Usun</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Paper style={{marginTop: '20px'}}>
                    <FormGroup>  
                        <TextField id="group-name" label="Nazwa grupy" value={this.state.groupName} onChange={this.handleChange} name="groupName"
                            margin="normal" variant="outlined" />
                    </FormGroup>
                    <Button onClick={this.addNewGroup}>Dodaj swoją grupę</Button>
                </Paper>
            </div>
        );
    };
}
export default withRouter(Groups);