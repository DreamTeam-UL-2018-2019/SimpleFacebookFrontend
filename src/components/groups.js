import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Button } from "@material-ui/core";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import axios from 'axios';
import './homepage.css';

class Groups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            slideMenuActive: false,
            expanded: false,
            userGroup: [],
        }
        this.test = this.test.bind(this);
        this.menuIsOpen = this.menuIsOpen.bind(this);
        this.onToggle = this.onToggle.bind(this);

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

    navigate = (x) => {
        console.log(x);
    }

    render() {
        const expanded = this.state.expanded;

        if (this.state.redirect) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nazwa grupy</TableCell>
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
                                    <Button onClick={() => this.test(group.id)}>Usun</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={this.test}>Jakiś tekst</Button>
            </Paper>
        );
    };
}
export default Groups;