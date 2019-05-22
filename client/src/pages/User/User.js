import React, { Component } from "react";
import { Container, Row, Col, Button, TextInput, Icon, Select } from "react-materialize";
import API from "../../utils/API";
import withAuth from './../../components/withAuth';
import helper from '../../helpers/calculations';
import moment from "moment";

import './User.css';

// Images
const backgroundImg ='./assets/images/background1.jpg';


class User extends Component {
  state = {
    user: [],
    firstName: "",
    lastName: "",
    age: "",
    weight: "",
    feet: "",
    inches: "",
    activity: "",
    exercise: "",
    sleep: "",
    gender: ""
  };

  componentDidMount() {
    API.getUser(this.props.user.id).then(res => {
      this.setState(
        {
          id: res.data._id,
          name: res.data.name,
          age: res.data.age,
          weight: res.data.weight,
          height: res.data.height,
          gender: res.data.gender,
          activity: res.data.activity
        }
      );
      console.log(res.data);
      console.log(moment().subtract(10,"days").format("YYYY-MMDD"));
      console.log(this.state);
    });
  };


  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleActivityChange = event => {
    this.setState({activity: event.target.value});
  };

  handleGenderChange = event => {
    this.setState({gender: event.target.value});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const BMI = Math.round(helper.calculateBMI(this.state.height, this.state.weight)*10)/10;
    const water_goal = Math.round(helper.calculateWaterGoal(this.state.weight));
    const intake_goal =  Math.round(helper.calculateCalorieRec(this.state.weight, this.state.height, this.state.age, this.state.gender, this.state.activity));
    // const exercise_goal = Math.round(helper.calculateExerciseGoal(this.state.activity));
    
    API.updateUser(this.props.user.id, {
      email: this.state.email, 
      name: this.state.name, 
      age: this.state.age, 
      weight: this.state.weight, 
      height: this.state.height, 
      gender: this.state.gender, 
      activity: this.state.activity, 
      BMI: BMI, 
      water_goal: water_goal, 
      intake_goal: intake_goal,
      exercise_goal: parseInt(this.state.activity)
    })
    .then(res => {
      this.props.history.replace('/day');
    });
  };

  render() {
    return (
      <div className="mainWrapper" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <Container className="containerUser">
          <Row>
            <Col className="s8 offset-s2 black-text center-align">
              Update Profile
              <hr/>
            </Col>
          </Row>
          <form className="userForm">
          <Row className="userFormSection">
            <Col className="s12 center-align">
                <TextInput 
                  m={12} 
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  name="name"
                  label="Name"
                />
              </Col>
            </Row>
            <Row>
              <Col className="s12 center-align">
                <TextInput
                  m={12} 
                  value={this.state.age}
                  onChange={this.handleInputChange}
                  name="age"
                  label="Age"
                />
                </Col>
            </Row>
            <Row>
              <Col className="s12 center-align">
                <TextInput
                  m={12} 
                  value={this.state.weight}
                  onChange={this.handleInputChange}
                  name="weight"
                  label="Weight (lbs)"
                />
                </Col>
            </Row>
            <Row>
              <Col className="s12 center-align">
                <TextInput
                  m={12} 
                  value={this.state.height}
                  onChange={this.handleInputChange}
                  name="height"
                  label="Height (inches)"
                />
                </Col>
            </Row>
            <Row>
              <Col className="s12 center-align">
                <Select value={this.state.activity} onChange={this.handleActivityChange} label="Activity Level">
                  <option value="0">Sedentary</option>
                  <option value="1">Light</option>
                  <option value="2">Moderate</option>
                  <option value="3">Very Active</option>
                  <option value="4">Extremely Active</option>
                </Select>
                </Col>
            </Row>
            <Row>
              <Col className="s12 center-align">
                <Select value={this.state.gender} onChange={this.handleGenderChange} label="Gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>
                </Col>
            </Row>
            <Row>
              <Col className="s12 center-align">
                <Button type="submit" waves="light" onClick={this.handleFormSubmit}>
                  Update<Icon right>send</Icon>
                </Button>
              
            </Col>
          </Row>
          </form>
        </Container>
      </div>
    );
  }
}

export default withAuth(User);
