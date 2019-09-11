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
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.jsx";

let  newData1={
    labels: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
      "ANN"
    ],
    datasets: [
      {
        label: "My First dataset",
        fill: true,
        // backgroundColor: gradientStroke,
        borderColor: "#1f8ef1",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#1f8ef1",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#1f8ef1",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 5,
        data: []
      }
    ]
  }

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    }
  };

  setBgChartData = name => {
    this.setState({
      bigChartData: name
    })
  }

  componentDidMount(){
    try{
      const {insolationData} = this.props.location.state
      newData1.datasets[0].data = insolationData
    }
    catch(err){

    }
  }

  // componentDidMount () {
  //   const st  = this.props.location.state
  // }

  render() {
    try{
      const {
        battery_capacity, 
        number_of_modules, 
        number_of_modules_in_series,
        number_of_modules_in_parallel, 
        siteName,
        siteLatitude,
        siteLongitude,
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
        insolationData
      } = this.props.location.state;

      return (
          <div className="content">
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <h5 className="card-category">Monthly Data</h5>
                        <CardTitle tag="h2">All Sky Insolation Incident on a Horizontal Surface (kW-hr/m^2/day)</CardTitle>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      {
                        //console.log('chartExample1 data: ', chartExample1[this.state.bigChartData])
                        console.log('chartExample1 data: ', insolationData)
                      }
                    <Line
                        data={newData1}
                        options={chartExample1.options}
                        //redraw = {true}
                        //ref={(reference) => this.reference = reference}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Data</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bell-55 text-info" />{" "}
                        Solar Energy Yield
                      </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={chartExample2.data}
                        options={chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Data</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                      Surface Pressure
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Bar
                        data={chartExample3.data}
                        options={chartExample3.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Data</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-send text-success" />
                      Temp. at 2 meters
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div className="chart-area">
                      <Line
                        data={chartExample4.data}
                        options={chartExample4.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="6" md="12">
                <Card className="card-tasks">
                  <CardHeader>
                    <h6 className="title d-inline">Battery </h6>
                    <h4> Battery Capacity: {module_nominal_voltage}V </h4>
                    <h4> Battery Capacity: {battery_capacity}Ah </h4>
                    <h4> Battery Temperature: 20 degree Celcius</h4>
                    <Row>
                      <Col lg="6">
                        <Card className="card-chart">
                          <CardHeader>
                            <h5 className="card-category">rate of</h5>
                            <CardTitle tag="h3">
                              <i className="tim-icons icon-bell-55 text-info" />{" "}
                                Charge
                              </CardTitle>
                          </CardHeader>
                          <CardBody>
                            <div className="chart-area">
                              <Line
                                data={chartExample2.data}
                                options={chartExample2.options}
                              />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg="6">
                        <Card className="card-chart">
                          <CardHeader>
                            <h5 className="card-category">rate of</h5>
                            <CardTitle tag="h3">
                              <i className="tim-icons icon-bell-55 text-info" />{" "}
                                Discharge
                              </CardTitle>
                          </CardHeader>
                          <CardBody>
                            <div className="chart-area">
                              <Line
                                data={chartExample2.data}
                                options={chartExample2.options}
                              />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    { 
                      //<p className="card-category d-inline"> imulationn Result</p>
                    }
                      <UncontrolledDropdown>
                        <DropdownToggle
                          caret
                          className="btn-icon"
                          color="link"
                          data-toggle="dropdown"
                          type="button"
                        >
                          <i className="tim-icons icon-settings-gear-63" />
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Something else
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                  </CardHeader>
                </Card>
              </Col>
              <Col lg="6" md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Solar PV | Results</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <div>
                      <h4> PV system losses : {PV_system_losses} %</h4>
                      <h4> Daily Ah requirements (System) : {daily_Ah_requirements_plus_losses} Ah</h4>
                    </div>
                    <div>
                      <h4> Daily equivalent sun hours (ESV) : {equivalent_sun_hours} hours</h4>
                    </div>
                    <div>
                      <h4> Total Solar Array Current : {total_solar_array_current}A</h4>
                      <h4> Charge Controller: 
                        {PV_nominal_voltage}V, 
                        {daily_Ah_requirements_plus_losses/10} A
                      </h4>
                      <h4> Inverter Size: {(daily_dc_load * 1.2)/1000}KVA @ {module_nominal_voltage}V</h4>
                      <h4> Recommended reserve time : {time_per_day} days</h4>
                    </div>
                    <h4> Number of Modules in Series: {number_of_modules_in_series}</h4>
                    <h4> Number of Modules in parallel: {number_of_modules_in_parallel}</h4>
                    <h4> Total Number of Modules: {number_of_modules}</h4>
                    <h4> Solar PV Tilt Angle: 20 degrees North</h4>
                    <h4> Solar PV Tilt Azimuth angle: 20 degrees East</h4>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        );
    }
    catch(err){
      return <div className="content">
          <h1 className="center"> Error: Nothing to display! </h1>
          <h1 className="center"> Please <a href="/"> Create a new model </a> to see results </h1>
        </div> 
    }
  }
}

export default Dashboard;
