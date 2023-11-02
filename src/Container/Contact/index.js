import  React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFacebook, BsLinkedin, BsTwitter, BsStackOverflow, BsGoogle, BsGithub, BsYoutube } from "react-icons/bs";
import './style.css';
const  ContactContainer = ()=>{
    const myData = [
        {name:'Facebook', link:'https://www.facebook.com/profile.php?id=100076983631542', text:'my facebook.'},
        {name:'Linkedin', link:'https://www.linkedin.com/in/abhimanyu-kc-47bb1a239/', text:'my linkedin.'},
        {name:'StackOverFlow', link:'#', text:'Check out to my stackoverflow account.'},
        {name:'Blog', link:'#', text:'Follow to my blog.'},
        {name:'GitHub', link:'https://github.com/abhimanyukc', text:'Follow to my github account.'},
        {name:'YouTube', link:'https://www.youtube.com/channel/UCwAiKjmQV100xfUWlnIHyLA', text:'my youtube channel.'},
        {name:'Email', link:'abhidesign88@gmail.com',  text:'write to me a mail'}
    ]
    return (
        <div className='contactWrap'>
        <Container>
            <Row>
                <Col>
                    <p>CONNECT WITH US</p>
                    <h1>Get in Touch</h1>
                </Col>
            </Row>
            <Row>
                <Col className='conectIcon'>
                    <ul className='socialIconsList'>
                        <li>
                            <a rel="noreferrer" href="https://www.facebook.com/profile.php?id=100076983631542" target="_blank">
                                <BsFacebook />
                            </a>
                        </li>
                        <li>
                            <a rel="noreferrer" href="https://www.linkedin.com/in/abhimanyu-kc-47bb1a239/" target="_blank">
                                <BsLinkedin />
                            </a>
                        </li>
                   
                        <li>
                            <a rel="noreferrer" href="#" target="_blank">
                                <BsStackOverflow />
                            </a>
                        </li>
                        <li>
                            <a rel="noreferrer" href="#" target="_blank">
                                <BsGoogle />
                            </a>
                        </li>
                        <li>
                            <a rel="noreferrer" href="https://github.com/abhimanyukc" target="_blank">
                                <BsGithub />
                            </a>
                        </li>
                        <li>
                            <a rel="noreferrer" href="https://www.youtube.com/channel/UCwAiKjmQV100xfUWlnIHyLA" target="_blank">
                                <BsYoutube />
                            </a>
                        </li> 
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup className='contactList'>
                        {
                            myData && myData.length > 0 ? myData.map((item)=>{
                                return (
                                    <ListGroup.Item key={item.name}>
                                        <span>{item.text}</span>
                                        <a href={item.link} rel="noreferrer"  target="_blank">
                                            {item.link}
                                        </a>
                                    </ListGroup.Item>
                                )
                            }) : ''
                        }
                        
                    </ListGroup>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default ContactContainer;