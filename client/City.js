import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants'

class Activity extends React.Component{

    constructor(props){
        super(props);

        this.state = {comment: '', props: props}
    }

    addComment(){
        const comment = this.state.comment;
        const activityId = this.state.props.activity.activityId;

        fetch('/api/comments/addComment', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({comment, activityId})
        }).then(res => {
            if (res.ok) {
                res.json().then(id => console.log("Comment added with id " + id));
            }
            else
                res.json().then(err => alert("Failed to add Comment: " + err.message));
        }).catch(err => alert("Error in sending data to server: " + err.message));

        this.setState({comment: ''});
    }

    handleCommentChange(e){
        this.setState({comment: e.target.value});
    }

    render(){
        return(
            <div id='events'>

                <h2>{this.props.activity.name}</h2>
                <p>{this.props.activity.description}</p>
                <img src= {this.props.activity.picture}/>
                <h3>Comment</h3>
                <textarea name="comment_event" rows="1" cols="50" value={this.state.comment} onChange={(e) => {this.handleCommentChange(e)}} placeholder="Please enter a comment..."></textarea>
                <Link className="button2" onClick={(e) => this.addComment(e)}>Send</Link>

            </div>
        )
    }

}

export default class City extends React.Component {
    constructor(props) {
        super(props);
        console.log('AAAA');

        this.state = {
            city: null,
            activityPicture: '',
            eNature: ''
        }
        this.loadData();

    };

    loadData() {
        fetch('/api/cities/getCity?id='+this.props.params.id)                       // Ask the route /cities to the server
            .then(res => res.json())                       // Retrieve the objects  in json
            .then(data => this.setState({city: data}))   // Modify the state accordingly
            .catch(err => console.log(err));               // Bad news: an error!
    }

    addActivity(e) {
        e.preventDefault();
        const name = this.state.aName;
        const description = this.state.disc;
        const url = this.state.url;
        const startDate = this.state.sDate;
        const endDate = this.state.eDate;
        const cityId = this.props.params.id;
        const nature = this.state.eNature;
        const picture = this.state.activityPicture;

        fetch('/api/activities/addActivity', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, url ,description, startDate, endDate, cityId, nature, picture})
        }).then(res => {
            if (res.ok) {
                res.json().then(id => console.log("Activity added with id " + id));
                this.loadData();
            }
            else
                res.json().then(err => alert("Failed to add Activity: " + err.message));
        }).catch(err => alert("Error in sending data to server: " + err.message));

        this.setState({aName: "", disc: null, url:null, sDate: "", eDate:'', picture:''});
        document.getElementById("place_radio").checked = false;
        document.getElementById("event_radio").checked = false;
        document.getElementById("monument_radio").checked = false;

        this.loadData();
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

    handleENatureChange(e) {
        if (this.state.eNature !== '')
            document.getElementById(this.state.eNature + '_radio').checked = false;
        this.setState({eNature: e.target.value});
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
            if (this.state.city.activities !== undefined)
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
                                <span className="cube"></span>
                                <span className="cube"></span>
                                <span className="cube"></span>
                                <h1>MONUMENTS OF {this.state.city.name}</h1>
                                {this.state.city.activities.filter(a => a.nature=='monument').map((a,i) => <Activity activity={a}/>)}
                            </div>

                            <div>
                                <h2>Insert a new activity</h2>
                                <form onSubmit={(e) => this.addActivity(e)}>
                                    <input type="text" value={this.state.aName} onChange={(e) => {this.handleActNameChange(e)}} placeholder="New Activity" /> <br />
                                    <textarea name="description" value={this.state.disc} onChange={(e) => {this.handleDiscChange(e)}}>Description</textarea ><br/>
                                    <input type="text" value={this.state.url} onChange={(e) => {this.handleUrlChange(e)}} placeholder="URL" /> <br />
                                    <input type="text" value={this.state.sDate} onChange={(e) => {this.handleSdateChange(e)}} placeholder="Start date" /> <br />
                                    <input type="text" value={this.state.eDate} onChange={(e) => {this.handleEdateChange(e)}} placeholder="End Date" /> <br />
                                    <input type="radio" id="place_radio" name="place" value="place" onChange={(e) => {this.handleENatureChange(e)}}/> Place <br />
                                    <input type="radio" id="event_radio" name="event" value="event" onChange={(e) => {this.handleENatureChange(e)}}/> Event <br />
                                    <input type="radio" id="monument_radio" name="monument" value="monument" onChange={(e) => {this.handleENatureChange(e)}}/> Monument <br />
                                    <input type="submit" value="Create" />
                                </form>
                                <ImagesUploader
                                    label="Upload a Picture for the Activity"
                                    url={HTTP_SERVER_PORT_IMAGES} optimisticPreviews = {true} multiple={false}
                                    onLoadEnd={(err, pictureFileName) => {
                                        if (err) console.error(err);
                                        else  this.state.activityPicture = pictureFileName;
                                    }}
                                />
                            </div>



                        </div>


                </div>




            )
            else
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






                        <div className="inner contact">
                            <h2>Insert a new activity</h2>

                            <div className="contact-form">

                                <form id="contact-us" onSubmit={(e) => this.addActivity(e)}>

                                    <div className="col-xs-6 wow animated slideInLeft" data-wow-delay=".5s">

                                        <input type="text" value={this.state.aName} required="required" className="form_activity" placeholder="Name" onChange={(e) => {this.handleActNameChange(e)}} /> <br />
                                        <input type="text" value={this.state.url} required="required" className="form_activity" placeholder="Start date (jj.mm.yyyy)" onChange={(e) => {this.handleUrlChange(e)}} /> <br />

                                    </div>
                                    <div className="col-xs-6 wow animated slideInRight" data-wow-delay=".5s">
                                        <textarea name="description" value={this.state.disc} required="required" className="form_activity" placeholder="End date (jj.mm.yyyy)" onChange={(e) => {this.handleDiscChange(e)}}>Description</textarea ><br/>
                                    </div>

                                    <div className="relative fullwidth col-xs-12">

                                        <input type="radio" id="place_radio" name="place" value="place" onChange={(e) => {this.handleENatureChange(e)}}/> Place <br />
                                        <input type="radio" id="event_radio" name="event" value="event" onChange={(e) => {this.handleENatureChange(e)}}/> Event <br />
                                        <input type="radio" id="monument_radio" name="monument" value="monument" onChange={(e) => {this.handleENatureChange(e)}}/> Monument <br />

                                        <ImagesUploader
                                            label="Upload a Picture for the Activity"
                                            url={HTTP_SERVER_PORT_IMAGES} optimisticPreviews = {true} multiple={false}
                                            onLoadEnd={(err, pictureFileName) => {
                                                if (err) console.error(err);
                                                else  this.state.activityPicture = pictureFileName;
                                            }}
                                        />
                                        <input type="submit" value="PUT YOU'R CONTENT" className="form-btn semibold"/>
                                        <div className="clear"></div>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
                )
        }
    }
}