import React from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { Routedict } from "../../data/statesAndCities.js";
import showToast from "../../helperFunctions/toast";
import routeValidator from "../../helperFunctions/routeValidator";
import axios from "axios";
import env from "../../env.json";

class SignupDriver extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      mobile: "", //should be changed to mobile
      email: "",
      username: "",
      password: "",
      confirm: "",
      age: "",
      truckNum: "", //should be changed to truckNum
      capacity: "", //should be changed to capacity
      transporterName: "",
      experience: "", //should be changed to experience
      route1fromstate: "",
      route1fromcity: "",
      route1tostate: "",
      route1tocity: "",
      route2fromstate: "",
      route2fromcity: "",
      route2tostate: "",
      route2tocity: "",
      route3fromstate: "",
      route3fromcity: "",
      route3tostate: "",
      route3tocity: "",
      isLoading: false,
      // Missing age value
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      routeValidator(this.state);
      this.setState({ isLoading: true });
      await axios.post(env.api + "/driver/signup", this.state);
      showToast("You have signedIn successfully", true);
      this.props.navigate("/driver/login");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        for (let key in err.response.data) {
          showToast(err.response.data[key], false);
        }
      } else {
        console.log("Error", err.message);
        showToast(err.message, false);
      }
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <img
                alt=""
                src={logo}
                width="35"
                height="35"
                className="d-inline-block align-top"
              />{" "}
              DriveKart
            </Navbar.Brand>
            <Navbar.Text
              className="justify-content-end"
              style={{
                fontSize: "25px",
                fontWeight: "400",
                color: "black",
              }}
            >
              For Driver
            </Navbar.Text>
          </Container>
        </Navbar>
        <h2
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "5px",
          }}
        >
          SignUp
        </h2>
        <hr
          style={{
            width: "15%",
            height: "6px",
            color: "#2576e8",
            backgroundColor: "#2576e8",
            borderWidth: "0",
            marginTop: "10px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "30px",
          }}
        />
        <Form
          style={{ marginLeft: "50px", marginBottom: "50px" }}
          onSubmit={this.handleSubmit}
        >
          <p
            className="mb-2"
            style={{
              textAlign: "left",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            Personal Details
          </p>
          <Container>
            <Row className="mb-2">
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Name</Form.Label>

                  <Form.Control
                    required
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Name"
                    name="name"
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Phone no.</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="0123456789"
                    value={this.state.mobile}
                    onChange={this.handleChange}
                    name="mobile"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Username</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Email</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="abc@xyz.com"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>
                    Password (min-length: 6, atleast one no. and one special
                    character)
                  </Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Confirm Password</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Confirm Passowrd"
                    value={this.state.confirm}
                    onChange={this.handleChange}
                    name="confirm"
                    required
                    style={
                      this.state.password !== this.state.confirm
                        ? { borderColor: "#f00" }
                        : { borderColor: "#0f0" }
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs="auto" md="auto">
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Age (in years)</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Age (in years)"
                    value={this.state.age}
                    onChange={this.handleChange}
                    name="age"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>

          <p
            className="mb-2"
            style={{
              textAlign: "left",
              fontSize: "20px",
              marginTop: "40px",
              fontWeight: "500",
            }}
          >
            Truck Details
          </p>
          <Container>
            <Row className="mb-2">
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Truck Number</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Truck Number"
                    value={this.state.truckNum}
                    onChange={this.handleChange}
                    name="truckNum"
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Truck Capacity (Rounded in Kgs)</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Truck Capacity"
                    value={this.state.capacity}
                    onChange={this.handleChange}
                    name="capacity"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Transporter Name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Transporter Name"
                    value={this.state.transporterName}
                    onChange={this.handleChange}
                    name="transporterName"
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup controlId="exampleForm.ControlInput1">
                  <Form.Label>Driving Experience (Rounded in Yrs)</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Driving Experience"
                    value={this.state.experience}
                    onChange={this.handleChange}
                    name="experience"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>
          <p
            className="mb-2"
            style={{
              textAlign: "left",
              fontSize: "20px",
              marginTop: "40px",
              fontWeight: "500",
            }}
          >
            Interested Routes
          </p>
          <Container>
            <Row className="mb-2">
              <Col lg="auto" md="auto">
                Route 1:
              </Col>
              <Col lg="auto" md="auto" style={{ marginLeft: "40px" }}>
                From:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route1fromstate}
                  onChange={this.handleChange}
                  name="route1fromstate"
                >
                  <option value="" defaultValue>
                    Select State
                  </option>
                  {Object.entries(Routedict).map(([key]) => (
                    <option value={key}> {key} </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route1fromcity}
                  onChange={this.handleChange}
                  name="route1fromcity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.route1fromstate !== "" &&
                    Routedict[this.state.route1fromstate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
              <Col lg="auto" md="auto" style={{ marginLeft: "20px" }}>
                To:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route1tostate}
                  onChange={this.handleChange}
                  name="route1tostate"
                >
                  <option value="" defaultValue>
                    Select State
                  </option>
                  {Object.entries(Routedict).map(([key]) => (
                    <option value={key}>{key}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route1tocity}
                  onChange={this.handleChange}
                  name="route1tocity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.route1tostate !== "" &&
                    Routedict[this.state.route1tostate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg="auto" md="auto">
                Route 2:
              </Col>
              <Col lg="auto" md="auto" style={{ marginLeft: "40px" }}>
                From:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route2fromstate}
                  onChange={this.handleChange}
                  name="route2fromstate"
                >
                  <option value="" defaultValue>
                    Select State
                  </option>
                  {Object.entries(Routedict).map(([key]) => (
                    <option value={key}>{key}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route2fromcity}
                  onChange={this.handleChange}
                  name="route2fromcity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.route2fromstate !== "" &&
                    Routedict[this.state.route2fromstate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
              <Col lg="auto" md="auto" style={{ marginLeft: "20px" }}>
                To:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route2tostate}
                  onChange={this.handleChange}
                  name="route2tostate"
                >
                  <option value="" defaultValue>
                    Select State
                  </option>
                  {Object.entries(Routedict).map(([key]) => (
                    <option value={key}>{key}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route2tocity}
                  onChange={this.handleChange}
                  name="route2tocity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.route2tostate !== "" &&
                    Routedict[this.state.route2tostate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col lg="auto" md="auto">
                Route 3:
              </Col>
              <Col lg="auto" md="auto" style={{ marginLeft: "40px" }}>
                From:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route3fromstate}
                  onChange={this.handleChange}
                  name="route3fromstate"
                >
                  <option value="" defaultValue>
                    Select State
                  </option>
                  {Object.entries(Routedict).map(([key]) => (
                    <option value={key}>{key}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route3fromcity}
                  onChange={this.handleChange}
                  name="route3fromcity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.route3fromstate !== "" &&
                    Routedict[this.state.route3fromstate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
              <Col lg="auto" md="auto" style={{ marginLeft: "20px" }}>
                To:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route3tostate}
                  onChange={this.handleChange}
                  name="route3tostate"
                >
                  <option value="" defaultValue>
                    Select State
                  </option>
                  {Object.entries(Routedict).map(([key]) => (
                    <option value={key}>{key}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.route3tocity}
                  onChange={this.handleChange}
                  name="route3tocity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.route3tostate !== "" &&
                    Routedict[this.state.route3tostate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row xs="auto">
              <Col>
                <Button
                  variant="outline-dark"
                  size="lg"
                  style={{ marginTop: "10px" }}
                  type="submit"
                  disabled={
                    this.state.password !== this.state.confirm ||
                    this.state.isLoading
                  }
                >
                  SignUp
                </Button>
              </Col>
              <Col>
                <h6
                  style={{
                    marginTop: "20px",
                    fontWeight: "400",
                  }}
                >
                  Have an Account already?
                  <Link
                    to="/driver/login"
                    style={{
                      color: "45baea",
                      marginLeft: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </h6>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignupDriver);
