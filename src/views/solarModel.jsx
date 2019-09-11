/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

// core components
import {
  location
} from "variables/charts.jsx";

class solarModel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      siteName: '',
      siteLatitude: '',
      siteLongitude: '',
      daily_dc_load: '',
      time_per_day: '',
      PV_nominal_voltage: '',
      PV_system_losses: '',
      Module_rated_current: '',
      module_nominal_voltage: '',
      daily_Ah_requirements: '',
      battery_capacity: '',
      daily_Ah_requirements_plus_losses: '',
      equivalent_sun_hours:'sun',
      total_solar_array_current: '',
      number_of_modules: '',
      number_of_modules_in_series: '', 
      number_of_modules_in_parallel: '',
      insolationData: []
      }

    //this.calculateModel = this.calculateModel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(name, value)
  }

  handleSubmit(event) {
    event.preventDefault();
    let esv = ''
    //check if lat and long values are real
    if(this.state.siteLatitude === '' || this.state.siteLongitude === ''){
      alert("Site Latitude or Longitude is missing, please add it up! ")
      return
    }
    location.lat = this.state.siteLatitude
    location.long = this.state.siteLongitude
    const url = `https://power.larc.nasa.gov/cgi-bin/v1/DataAccess.py?request=execute&identifier=SinglePoint&parameters=T2M,PS,ALLSKY_SFC_SW_DWN&startDate=2017&endDate=2017&userCommunity=SSE&tempAverage=INTERANNUAL&outputList=JSON,ASCII&lat=${this.state.siteLatitude}&lon=${this.state.siteLongitude}&user=anonymous`
    //console.log(url)
    fetch(url)
    .then((user) => user.json())
    .then((data) => {
      const insolationsData = data.features[0].properties.parameter.ALLSKY_SFC_SW_DWN
      const esvData = Object.values(insolationsData)
     
      this.setState({
        insolationData: esvData
      })
       console.log('insolationDataArray: ', this.state.insolationData)
       console.log('esvData: ', esvData)
      //calculate  daily esv
      esv = Object.entries(insolationsData).reduce(function (total, pair) {
        const [key, value] = pair;
        if(value > 0){
          total += value;
        }
        return (total)
      }, 0);
      console.log(insolationsData)
      console.log('esv: ', esv/13)
      //round esv to the nearest whole number
      esv = Math.round(esv/13)
      //set esv state
      this.setState({equivalent_sun_hours: esv})
      console.log('equivalent_sun_hours: ', esv)
    })
    .then(() => {
      if(this.calculateModel() === '') return  
    })
    .then(() => {
      alert('A new model is available!');
      this.props.history.push({
        pathname: '/admin/dashboard',
        state: this.state
      }) 
    })
  }

  calculateModel() { 
    let {
      battery_capacity, 
      number_of_modules, 
      number_of_modules_in_series, 
      number_of_modules_in_parallel,
      daily_dc_load,
      time_per_day,
      PV_nominal_voltage,
      PV_system_losses,
      Module_rated_current,
      module_nominal_voltage,
      daily_Ah_requirements,
      daily_Ah_requirements_plus_losses,
      equivalent_sun_hours,
      total_solar_array_current,
    } = this.state;
    if(time_per_day === '' || PV_system_losses === '' || Module_rated_current === '' || module_nominal_voltage === ''
        || daily_dc_load === '' || PV_nominal_voltage === ''){
      alert("One Model parameter is missing, please add it up! ")
      return ''
    }
    daily_Ah_requirements = (daily_dc_load * time_per_day)/PV_nominal_voltage
    daily_Ah_requirements_plus_losses = daily_Ah_requirements +  ( (PV_system_losses/100) * daily_Ah_requirements)
    total_solar_array_current = daily_Ah_requirements_plus_losses / equivalent_sun_hours
    number_of_modules_in_series = PV_nominal_voltage / module_nominal_voltage
    number_of_modules_in_parallel = total_solar_array_current / Module_rated_current
    number_of_modules = number_of_modules_in_series * number_of_modules_in_parallel
    battery_capacity = daily_Ah_requirements_plus_losses * time_per_day
    this.setState({
      battery_capacity: battery_capacity,
      daily_Ah_requirements: daily_Ah_requirements,
      number_of_modules: number_of_modules,
      daily_Ah_requirements_plus_losses: daily_Ah_requirements_plus_losses,
      total_solar_array_current: total_solar_array_current,
      number_of_modules_in_series: number_of_modules_in_series,
      number_of_modules_in_parallel: number_of_modules_in_parallel
    })
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="9">
              <Card>
                <CardHeader>
                  <h3 className="title">New Solar Site Model </h3>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Site Name</label>
                          <Input
                            placeholder="Enter new site name"
                            type="text"
                            name="siteName"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Latitude</label>
                          <Input
                            placeholder="Enter Site Latitude"
                            type="text"
                            name="siteLatitude"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label> Longitude </label>
                          <Input 
                            placeholder="Enter new site Longitude" 
                            type="text" 
                            name="siteLongitude"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Daily DC energy use (for all loads, in KW)</label>
                          <Input
                            placeholder="Example: 120"
                            type="text"
                            name="daily_dc_load"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>average operational time per day (in hours)</label>
                          <Input 
                            placeholder="Example: 9"
                            type="text"
                            name="time_per_day"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>PV system nominal voltage</label>
                          <Input
                            placeholder="Example: 12V"
                            type="text"
                            name="PV_nominal_voltage"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label> Add PV system losses (in %)</label>
                          <Input 
                            placeholder="Example: 10" 
                            type="text" 
                            name="PV_system_losses"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Module rated current (in Amp)</label>
                          <Input
                            placeholder="Example: 10.4"
                            type="text"
                            name="Module_rated_current"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Module nominal voltage (in Volts)</label>
                          <Input
                            placeholder="Example: 13V"
                            type="text"
                            name="module_nominal_voltage"
                            onChange={this.handleInputChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            placeholder="Enter your site actual address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            placeholder="Example: Abuja"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            placeholder="Example: Nigeria"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>Site Details</label>
                          <Input
                            cols="80"
                            placeholder="Describe your site details here."
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                      {
                        <Button className="btn-fill" color="primary" type="submit">
                          Calculate Model
                        </Button>
                      }
                  </Form>
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default solarModel;
