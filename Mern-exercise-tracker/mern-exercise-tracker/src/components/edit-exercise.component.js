import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    

        this.state = {
          
          username: '',
          description: '',
          duration: 0,
          date: new Date(),
          users: [],
        };
      }

  
      componentDidMount() {
        
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response=> {
              this.setState({
                username: response.data.username,
                description: response.data.description,
                duraion: response.data.duration,
                date: new Date(response.data.date)
        });
    })
    .catch(function (error) {
        console.log(error);
    })
      axios.get('http://localhost:5000/exercises/')
      .then(response=> {
          if(response.data.length > 0){
              this.setState({
                users: response.data.map(user => user.username),
              })
          }     
        });
    }
      onChangeUsername(e) { // event to be called by username text box function
        // use this.setState({...}); instead of this.state.username = "new username";
        this.setState({
          username: e.target.value, // update just the username in this.state
        });
      }
    
      onChangeDescription(e) {
        this.setState({
          description: e.target.value
        });
      }
    
      onChangeDuration(e) {
        this.setState({
          duration: e.target.value
        });
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        });
      }
    
      onSubmit(e) {
        e.preventDefault(); // prevent default HTML form action
    
        const exercise = {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date,
        }
        console.log(exercise);

        axios.post('http://localhost:5000/exercise/add/', exercise) // user is in the JSON format expected
        .then((res) => {
          console.log(res.data);
        })

        window.location = '/';
    }
    
    
      
    render() {
        return (
            <div>
               <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  // like AngularJS ng-repeat:
                  this.state.users.map((user) => {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              {/* npm install react-datepicker */}
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
            </div>
        )
    }
}