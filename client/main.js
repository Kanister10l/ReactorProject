import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import Home from './Home.js';
import City from './City.js';
import Activity from './Activity.js'
import Modal from './Modal.js';


ReactDOM.render(
    <div>
        <header id="home" className="header">
            <nav id="menu">
                <img src="/images/menu_open.png" alt="menu_open" className="menu_open"/>
                <img src="/images/menu_close.png" alt="menu_close" className="menu_close"/>
                <a href="#home"><img className="name" src="/images/Logo_AirnayBlanc.png"/></a>
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="#cities">Cities</a></li>
                    <li><a href="#section_monuments">Monuments</a></li>
                    <li><a href="#section_events">Events</a></li>
                    <li><a href="/"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;Julien
                        Fovelle</a></li>
                </ul>
            </nav>

            <div id="slider">
                <div id="slides">
                    <img src="images/slider1.jpg" alt=""/>
                    <img src="images/slider2.jpg" alt=""/>
                    <img src="images/slider3.jpg" alt=""/>
                    <img src="images/slider4.jpg" alt=""/>
                    <img src="images/arras.png" alt=""/>
                </div>
                <span className="overlay"></span>
            </div>

            <div className="Content_Header">
                <div className="discover">
                    <span className="trait" id="traitG"></span>
                    <span>DISCOVER</span>
                    <span className="trait" id="traitD"></span>
                </div>
                <div class="header_txt">
                    <span className="hightitle_header"> Powerful Features </span>
                    <span className="subtitle_header"> Discover incredible places and events </span>
                </div>
            </div>

            <div className="mouse_bounce">
                <a href="#about"><img src="images/mouse.png"/></a>
            </div>
        </header>

        <Router history={hashHistory}>
            <Route path="/" component={Home}/>
            <Route path="/city/:id" component={City}/>
            <Route path="/activity/:id" component={Activity}/>
            <Route path="*" component={() => <p>Page Not Found</p>}/>
        </Router>

        <footer>
            <div className="footer_corps">
                <div className="footer_copyright">
                    Copyright - Prompt Agency
                </div>
                <div className="footer_navigation">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#cities">Cities</a></li>
                        <li><a href="#">More Informations</a></li>

                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
    ,
    document.getElementById('root')
);

if (module.hot)
    module.hot.accept();

