import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'

class Activity extends React.Component{
    render(){
        return(
            <div id='events'>

                <h2>{this.props.activity.name}</h2>
                <p>{this.props.activity.description}</p>
                <img src= {this.props.activity.picture}/>
                <h3>Comment</h3>
                <textarea name="comment_event" rows="1" cols="50" placeholder="Please enter a comment..."></textarea>
                <Link className="button2" to="#">Send</Link>

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
        console.log('/api/cities/getCity/'+this.props.params.id);
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
            const bg_city = {
                position:'absolute',
                top: 0,
                left: 0,
                height:'100vh',
                width: '100%',
                backgroundImage: "url("+this.state.city.picture+")",
                backgroundSize: 'cover',
                backgroundPosition: 'top',
            }
            return (

                <div>


                    <div style={bg_city}>
                        <span className="overlay"></span>
                    </div>

                        <div className="Content_Header">
                            <div className="discover">
                                <span className="trait" id="traitG"></span>
                                <span>DISCOVER</span>
                                <span className="trait" id="traitD"></span>
                            </div>
                            <div className="header_txt">
                                <span className="hightitle_header"> {this.state.city.name} </span>
                                <span className="subtitle_header"> {this.state.city.country} </span>
                            </div>
                        </div>
                        <div id='section1'>
                            <div className="entete">
                                <h1>DESCRIPTION OF {this.state.city.name}</h1>
                                <img src="images/Guill.png" alt=""/>
                                <p>{this.state.city.description}</p>
                                <img src="images/GuillV.png" alt=""/>
                            </div>


                            <div id="events">
                                <span className="cube"></span>
                                <span className="cube"></span>
                                <span className="cube"></span>
                                <h1>EVENTS OF {this.state.city.name}</h1>
                                {this.state.city.activities.filter(a => a.nature=='event').map((a,i) => <Activity activity={a}/> )}
                                <span className="cube"></span>
                                <span className="cube"></span>
                                <span className="cube"></span>
                                <h1>PLACES OF {this.state.city.name}</h1>
                                {this.state.city.activities.filter(a => a.nature=='place').map((a,i) => <Activity activity={a}/>)}
                            </div>

                        </div>


                </div>




            )
        }
    }
}