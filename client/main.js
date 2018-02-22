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
                    <li>
                        <div className="container">
                            <a id="modal_trigger" href="#modal">Login / Sign Up</a>

                            <div id="modal" className="popupContainer" style={{display: 'none'}}>

                                <header className="popupHeader">
                                    <span className="header_title"> REGISTER OR LOGIN ? </span>
                                    <span className="modal_close"><i className="fa fa-times"></i></span>
                                </header>

                                <section className="popupBody">

                                    <div className="social_login">

                                        <div className="action_btns">
                                            <div className="one_half"><a href="#" id="login_form"
                                                                         className="btn">Login</a></div>
                                            <div className="one_half last"><a href="#" id="register_form"
                                                                              className="btn">Sign up</a></div>
                                        </div>
                                    </div>

                                    <div className="user_login">
                                        <form>
                                            <label>Email Adresse </label>
                                            <div className="container">
                                                <a id="modal_trigger" href="#modal">Login / Sign Up</a>

                                                <div id="modal" className="popupContainer" style={{display: 'none'}}>

                                                    <header className="popupHeader">
                                                        <span className="header_title"> REGISTER OR LOGIN ? </span>
                                                        <span className="modal_close"><i
                                                            className="fa fa-times"/></span>
                                                    </header>

                                                    <section className="popupBody">

                                                        <div className="social_login">

                                                            <div className="action_btns">
                                                                <div className="one_half"><a href="#" id="login_form"
                                                                                             className="btn">Login</a>
                                                                </div>
                                                                <div className="one_half last"><a href="#"
                                                                                                  id="register_form"
                                                                                                  className="btn">Sign
                                                                    up</a></div>
                                                            </div>
                                                        </div>

                                                        <div className="user_login">
                                                            <form>
                                                                <label>Email Adresse </label>
                                                                <input type="text"/>
                                                                <br/>

                                                                <label>Password</label>
                                                                <input type="password"/>
                                                                <br/>

                                                                <div className="action_btns">
                                                                    <div className="one_half"><a href="#"
                                                                                                 className="btn back_btn"><i
                                                                        className="fa fa-angle-double-left"></i>
                                                                        Back</a></div>
                                                                    <div className="one_half last"><a href="#"
                                                                                                      className="btn btn_red">Login</a>
                                                                    </div>
                                                                </div>
                                                            </form>

                                                        </div>


                                                        <div className="user_register">
                                                            <form>
                                                                <label>Full Name</label>
                                                                <input type="text"/>
                                                                <br/>

                                                                <label>Email Address</label>
                                                                <input type="email"/>
                                                                <br/>

                                                                <label>Password</label>
                                                                <input type="password"/>
                                                                <br/>

                                                                <div className="action_btns">
                                                                    <div className="one_half"><a href="#"
                                                                                                 className="btn back_btn"><i
                                                                        className="fa fa-angle-double-left"></i>
                                                                        Back</a></div>
                                                                    <div className="one_half last"><a href="#"
                                                                                                      className="btn btn_red">Register</a>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                            <input type="text"/>
                                            <br/>

                                            <label>Password</label>
                                            <input type="password"/>
                                            <br/>

                                            <div className="action_btns">
                                                <div className="one_half"><a href="#" className="btn back_btn"><i
                                                    className="fa fa-angle-double-left"></i> Back</a></div>
                                                <div className="one_half last"><a href="#"
                                                                                  className="btn btn_red">Login</a>
                                                </div>
                                            </div>
                                        </form>

                                    </div>


                                    <div className="user_register">
                                        <form>
                                            <label>Full Name</label>
                                            <input type="text"/>
                                            <br/>

                                            <label>Email Address</label>
                                            <input type="email"/>
                                            <br/>

                                            <label>Password</label>
                                            <input type="password"/>
                                            <br/>

                                            <div className="action_btns">
                                                <div className="one_half"><a href="#" className="btn back_btn"><i
                                                    className="fa fa-angle-double-left"></i> Back</a></div>
                                                <div className="one_half last"><a href="#" className="btn btn_red">Register</a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </section>
                            </div>
                        </div>


                    </li>
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
            <Route path="*" component={() =>
                <div className="error404">
                    <style>
                        {"header { display: none}"}
                        {"footer { display: none}"}
                    </style>
                    <div className="align404">
                        <span className="main_title"> There is not enough wind.. </span>
                        <span className="second_title"> The plane crashed </span>
                        <span className="error"> ERROR #404 </span>
                    </div>
                    <img className="plane" src="../images/plane404.png" alt="plane_crashed"/>
                </div>
            }/>
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

        <a href="#home"><img id="imgup" className="upslide" src="images/Up.png" alt="UpSlide"/></a>
    </div>
    ,
    document.getElementById('root')
);

if (module.hot)
    module.hot.accept();

