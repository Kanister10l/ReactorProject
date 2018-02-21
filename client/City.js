import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'

class Activity extends React.Component{
    render(){
        return(
            <div className='activities'>
                <img src= {this.props.activity.picture} width="250px" height="250px"/>
                <p><Link to={`/activity/${this.props.activity._id}`} activeClassName="active">{this.props.activity.name}</Link></p>
            </div>
        )
    }

}

export default class City extends React.Component {
    constructor(props) {
        super(props);
        console.log('AAAA');

        this.state = {
            city: null
        }
        this.loadData();

    };

    loadData() {
        console.log('/api/cities/getCity?id='+this.props.params.id);
        fetch('/api/cities/getCity?id='+this.props.params.id)                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({city: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
        console.log(this.state.city);

    }

    componentDidMount() {
        this.loadData();
    }


    render() {
        let city =  this.state.city;
        console.log(city);
        if(city == null){
            return ( <div>loading...</div>)
        }else {
            console.log(this.state.city);
            return (
                <div className='city'>
                    <img src={this.state.city.picture}/>
                    <p>{this.state.city.name}</p>
                    <p>{this.state.city.description}</p>
                    <h1> Places </h1>
                    {this.state.city.activities.filter(a => a.nature=='place').map((a,i) => <Activity activity={a}/> )}
                    <h1> Events </h1>
                    {this.state.city.activities.filter(a => a.nature=='event').map((a,i) => <Activity activity={a}/>)}

                </div>

            )
        }
    }
}