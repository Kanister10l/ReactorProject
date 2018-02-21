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

    addActivity(e) {
        e.preventDefault();
        const activityName = this.state.aName;
        const actDescription = this.state.disc;
        const url = this.state.url;
        const startDate = this.state.sDate;
        const endDate = this.state.eDate;

        fetch('/api/cities/addCity', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({activityName, url ,actDescription, startDate, endDate})
        }).then(res => {
            if (res.ok) {
                res.json().then(id => console.log("City added with id " + id));
                this.loadData();
            }
            else
                res.json().then(err => alert("Failed to add city: " + err.message));
        }).catch(err => alert("Error in sending data to server: " + err.message));

        this.setState({aName: "", disc: null, url:null, sDate: "", eDate:''});
    }

    handleActNameChange(e) {
        this.setState({aName: e.target.value});
    }

    handleDiscChange(e) {
        this.setState({disc: e.target.value});
    }

    handleUrlChange(e) {
        this.setState({url: e.target.value});
    }

    handleSdateChange(e) {
        this.setState({sDate: e.target.value});
    }

    handleEdateChange(e) {
        this.setState({eDate: e.target.value});
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

                    <h2>Insert a new activity</h2>
                    <form onSubmit={(e) => this.addActivity(e)}>
                        <input type="text" value={this.state.aName} onChange={(e) => {this.handleActNameChange(e)}} placeholder="New Activity" /> <br />
                        <textarea name="description" value={this.state.disc} onChange={(e) => {this.handleDiscChange(e)}}>Description</textarea ><br/>
                        <input type="text" value={this.state.url} onChange={(e) => {this.handleUrlChange(e)}} placeholder="URL" /> <br />
                        <input type="text" value={this.state.sDate} onChange={(e) => {this.handleSdateChange(e)}} placeholder="Start date" />
                        <input type="text" value={this.state.eDate} onChange={(e) => {this.handleEdateChange(e)}} placeholder="End Date" />
                        <br /><br />
                        <input type="submit" value="Create" />
                    </form>
                </div>

            )
        }
    }
}