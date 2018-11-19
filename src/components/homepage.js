import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import { Container, Row, Col } from 'react-grid-system';
import Image from 'react-image';
import img from '../img/Retro.jpg';
import testImg from '../img/Test.jpg';
//import { Grid, Paper} from "@material-ui/core";
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
            <Container fluid style={{ lineHeight: '32px' }}>
                <Row>
                    <Col md={3} ><Image src={img}/></Col>
                    <Col md={6} >
                        <div>
                            <Image src={testImg}>
                
                            </Image>
                        </div>
                    </Col>
                    <Col md={3} ><Image src={img}/></Col>
                </Row>
            </Container>
          );
    };
}
export default HomePage;