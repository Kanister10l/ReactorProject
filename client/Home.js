import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';


class CityLaconic extends React.Component{
    render(){
        return(
            <div className="card">
                <div className="container">
                    <h4><Link to={'/city/' + this.props.city._id}>{this.props.city.name}</Link></h4>
                    <img width="250" height="250"  src={this.props.city.picture} alt="" />
                </div>

            </div>
        )
    }
}

class City extends React.Component{
    render(){
        return(
        <div className="card">
            <div className="container">
                <h4><b>{this.props.city.name}</b></h4>
            </div>
        </div>
        )
    }
}



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {cities: [], name: "", lat: null, long: null, country: "", picture: ""};
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
        const picture = this.state.picture;
        const countryName = this.state.country;

        fetch('/api/cities/addCity', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({cityName, cityLatitude, cityLongitude, countryName, picture})
        }).then(res => {
            if (res.ok) {
                res.json().then(id => console.log("City added with id " + id));
                this.loadData();
            }
            else
                res.json().then(err => alert("Failed to add city: " + err.message));
        }).catch(err => alert("Error in sending data to server: " + err.message));

        this.setState({name: "", lat: null, long:null, country: "", picture:''});
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

    handlePictureChange(e) {
        this.setState({picture: e.target.value});
    }

    handleCountryChange(e) {
        this.setState({country: e.target.value});
    }

    componentDidMount(){
        this.loadData();
    }

    render() {
        let cities = this.state.cities;
        if (cities == []){
            return <div>No Image Loaded</div>
        }else {
            return (
                <div>
                    <h1>My Cities... The places to be!</h1>
                    <p> You can find in this website many cities with beautiful places, events (festivals, concerts and
                        so on).
                        Please, join us, and you will have the possibilities to participate to this new social
                        network. <br/>
                        Enjoy!!
                    </p>
                    {cities.map(city => <CityLaconic city={city}></CityLaconic>)
                    }

                    <h2>Insert a new city</h2>
                    <form onSubmit={(e) => this.addCity(e)}>
                        <input type="text" value={this.state.name} onChange={(e) => {this.handleNameChange(e)}} placeholder="Name of the city" /> <br />
                        <input type="number" value={this.state.lat} onChange={(e) => {this.handleLatChange(e)}} placeholder="Latitude" /> <br />
                        <input type="number" value={this.state.long} onChange={(e) => {this.handleLongChange(e)}} placeholder="Longitude" /> <br />
                        <input type="text" value={this.state.country} onChange={(e) => {this.handleCountryChange(e)}} placeholder="Country" /> <br />
                        <input type="text" value={this.state.picture} onChange={(e) => {this.handlePictureChange(e)}} placeholder="Image URL" /> <br />

                        <input type="submit" value="Create" />
                    </form>
                </div>
            )
        }
    }
}




