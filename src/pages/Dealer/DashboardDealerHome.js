import React from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import DriverCard from "./DriverCard";
import { DealerAuthContext } from "../../contexts/DealerAuthContext";
import axios from "axios";
import env from "../../env.json";
import showToast from "../../helperFunctions/toast";
import { withRouter } from "../../customHooks/WithRouter";

class DealerDashboardHome extends React.Component {
  static contextType = DealerAuthContext;
  state = {
    drivers: [],
  };

  async componentDidMount() {
    try {
      const res = await axios.post(env.api + "/driver/other/byAddress", {
        token: localStorage.getItem("token"),
        state: this.context.state,
        city: this.context.city,
      });
      this.setState({ drivers: res.data });
    } catch (err) {
      if (err.response) {
        showToast(err.response.data, false);
        console.log(err.response);
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
                  backgroundColor: "#dcdcdc",
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
        <Container className="mt-3" style={{ marginBottom: "60px" }}>
          {this.state.drivers.length === 0 ? (
            <h1>There are no drivers at your route</h1>
          ) : (
            this.state.drivers.map((driver, ind) => (
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

export default withRouter(DealerDashboardHome);
