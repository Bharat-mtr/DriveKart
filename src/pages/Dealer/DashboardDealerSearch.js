import React from "react";
import { Navbar, Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import DriverCard from "./DriverCard";
import { DealerAuthContext } from "../../contexts/DealerAuthContext";
import { Routedict } from "../../data/statesAndCities.js";
import axios from "axios";
import env from "../../env.json";
import showToast from "../../helperFunctions/toast";
import { withRouter } from "../../customHooks/WithRouter";

class DealerDashboardSearch extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchfromstate: "",
      searchfromcity: "",
      searchtostate: "",
      searchtocity: "",
      drivers: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = DealerAuthContext;

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(env.api + "/driver/other/byRoute", {
        token: localStorage.getItem("token"),
        fromState: this.state.searchfromstate,
        fromCity: this.state.searchfromcity,
        toState: this.state.searchtostate,
        toCity: this.state.searchtocity,
      });

      let drivers = [];
      for (var obj of res.data) {
        for (var driver of obj.Drivers) {
          drivers.push({
            ...driver,
            fromState: obj.fromState,
            fromCity: obj.fromCity,
            toState: obj.toState,
            toCity: obj.toCity,
          });
        }
      }
      this.setState({
        drivers,
      });
      console.log(this.state);
    } catch (err) {
      if (err.response) {
        showToast(err.response.data, true);
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          this.props.navigate("/dealer/login");
        }
      }
    }
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
              Hi {this.context.name}
            </Navbar.Text>
          </Container>
        </Navbar>

        <Container style={{ marginTop: "50px" }}>
          <Row lg="auto" md="auto">
            <Col style={{ padding: "0" }}>
              <div
                style={{
                  border: "1px solid",
                  fontSize: "18px",
                  padding: "8px 20px",
                }}
              >
                <Link
                  to="/dealer/dashboard/home"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </div>
            </Col>
            <Col style={{ padding: "0" }}>
              <div
                style={{
                  border: "1px solid",
                  fontSize: "18px",
                  padding: "8px 20px",
                  backgroundColor: "#dcdcdc",
                }}
              >
                <Link
                  to="/dealer/dashboard/search"
                  style={{ textDecoration: "none" }}
                >
                  Search By Route
                </Link>
              </div>
            </Col>
          </Row>
        </Container>

        <Form
          style={{ marginTop: "50px", marginBottom: "50px" }}
          onSubmit={this.handleSubmit}
        >
          <Container>
            <Row>
              <Col xs="auto" md="auto">
                From:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.searchfromstate}
                  onChange={this.handleChange}
                  name="searchfromstate"
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
                  value={this.state.searchfromcity}
                  onChange={this.handleChange}
                  name="searchfromcity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.searchfromstate !== "" &&
                    Routedict[this.state.searchfromstate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
              <Col xs="auto" md="auto" style={{ marginLeft: "30px" }}>
                To:
              </Col>
              <Col>
                <Form.Select
                  required
                  value={this.state.searchtostate}
                  onChange={this.handleChange}
                  name="searchtostate"
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
                  value={this.state.searchtocity}
                  onChange={this.handleChange}
                  name="searchtocity"
                >
                  <option value="" defaultValue>
                    Select City
                  </option>
                  {this.state.searchtostate !== "" &&
                    Routedict[this.state.searchtostate].map((st) => (
                      <option value={st}>{st}</option>
                    ))}
                </Form.Select>
              </Col>
              <Col style={{ marginLeft: "30px" }}>
                <Button type="submit" variant="primary" size="md">
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
        <Container className="mt-3" style={{ marginBottom: "60px" }}>
          {this.state.drivers.length === 0 ? (
            <h1>Sorry there are no drivers on this route</h1>
          ) : (
            this.state.drivers.map((driver) => (
              <DriverCard
                name={driver.name}
                phoneno={driver.mobile}
                truckno={driver.truckNum}
                capacity={driver.capacity}
                transname={driver.transporterName}
                drexp={driver.experience}
                fromstate={driver.fromState}
                fromcity={driver.fromCity}
                tostate={driver.toState}
                tocity={driver.toCity}
                id={driver.id}
              />
            ))
          )}
        </Container>
      </div>
    );
  }
}

export default withRouter(DealerDashboardSearch);
