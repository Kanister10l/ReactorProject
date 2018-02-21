import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';


class CityLaconic extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <span><Link to={'/city/' + this.props.city._id}>{this.props.city.name}</Link></span>
                    <img src={this.props.city.picture} alt=""/>
                </div>
            </div>
        )
    }
}

class City extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="container">
                    <h4><b>{this.props.name}</b></h4>
                </div>
            </div>
        )
    }
}


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cities: [], name: "", lat: null, long: null, country: ""};
    }

    loadData() {
        fetch('/api/cities/getAllCities')                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({cities: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
    }

    addCity(e) {
        e.preventDefault();
        const cityName = this.state.name;
        const cityLatitude = this.state.lat;
        const cityLongitude = this.state.long;
        const countryName = this.state.country;

        fetch('/api/cities/addCity', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cityName, cityLatitude, cityLongitude, countryName})
        }).then(res => {
            if (res.ok) {
                res.json().then(id => console.log("City added with id " + id));
                this.loadData();
            }
            else
                res.json().then(err => alert("Failed to add city: " + err.message));
        }).catch(err => alert("Error in sending data to server: " + err.message));

        this.setState({name: "", lat: null, long: null});
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleLatChange(e) {
        this.setState({lat: e.target.value});
    }

    handleLongChange(e) {
        this.setState({long: e.target.value});
    }

    handleCountryChange(e) {
        this.setState({country: e.target.value});
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        let cities = this.state.cities;
        if (cities == []) {
            return <div>No Image Loaded</div>
        } else {
            return (
                <div>
                    <div id="about" className="pres-size">
                        <div className="pres">
                            <div>
                                <img src="images/element1.png" alt=""/>
                                <h1>Events</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto
                                    assumenda consequatur
                                    dolorum ex expedita</p>
                                <a className="button1" href="">See more</a>
                            </div>
                            <div>
                                <img src="images/element2.png" alt=""/>
                                <h1>Monuments</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto
                                    assumenda consequatur
                                    dolorum ex expedita</p>
                                <a className="button1" href="">See more</a>
                            </div>
                            <div>
                                <img src="images/element3.png" alt=""/>
                                <h1>Cities</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto
                                    assumenda consequatur
                                    dolorum ex expedita</p>
                                <a className="button1" href="">See more</a>
                            </div>
                        </div>
                    </div>
                    <img className="separation" src="images/separation1.png" alt="separation"/>
                    <span className="city_chose"> Choose your city ! </span>
                    <div id="cities" className="city">
                        {cities.map(city => <CityLaconic key={city._id} city={city}></CityLaconic>)}
                    </div>
                    <div className="footer-size">
                        <div className="footer">
                            <div className="form">
                                <form onSubmit={(e) => this.addCity(e)}>
                                    <input type="text" value={this.state.name} onChange={(e) => {
                                        this.handleNameChange(e)
                                    }} placeholder="Name of the city"/> <br/>
                                    <input type="number" value={this.state.lat} onChange={(e) => {
                                        this.handleLatChange(e)
                                    }} placeholder="Latitude"/> <br/>
                                    <input type="number" value={this.state.long} onChange={(e) => {
                                        this.handleLongChange(e)
                                    }} placeholder="Longitude"/> <br/>
                                    <input type="text" value={this.state.country} onChange={(e) => {
                                        this.handleCountryChange(e)
                                    }} placeholder="Country"/> <br/>



                                    <input type="submit" value="Create"/>
                                </form>
                            </div>
                            <div>
                                <h1>Add city your here, nothing easier</h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis perspiciatis quis
                                    magni impedit corporis
                                    nam iusto tempora quod ipsam, veritatis aperiam. Alias deleniti ex dicta vel tempora
                                    magni consequatur
                                    laudantium?
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}




