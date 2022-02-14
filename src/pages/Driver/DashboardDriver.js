import React from "react";
import { Navbar, Container } from "react-bootstrap";
import logo from "../../images/logo.png";
import DealerCard from "./DealerCard";
import { DriverAuthContext } from "../../contexts/DriverAuthContext";
import showToast from "../../helperFunctions/toast";
import axios from "axios";
import env from "../../env.json";
import { withRouter } from "../../customHooks/WithRouter";
import { Link } from "react-router-dom";

class DriverDashboard extends React.Component {
  static contextType = DriverAuthContext;
  state = {
    dealers: [],
  };
  async componentDidMount() {
    try {
      let dealers = [];
      for (let ind in this.context.book) {
        const res = await axios.post(env.api + "/dealer/other/get/byId", {
          token: localStorage.getItem("token"),
          dealerId: this.context.book[ind],
        });
        dealers.push(res.data);
      }
      this.setState({
        dealers,
      });
    } catch (err) {
      if (err.response) {
        showToast(err.response.data, false);
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          this.props.navigate("/driver/login");
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
        <Container className="mt-3" style={{ marginBottom: "60px" }}>
          <p style={{ marginTop: "50px", fontSize: "25px" }}>
            List of dealers who booked you, All the relevant information of the
            dealers is provided below :-
          </p>
          {this.state.dealers.length === 0 ? (
            <h1>Sorry You haven&apos;t been booked by any dealer</h1>
          ) : (
            this.state.dealers.map((booking, ind) => (
              <DealerCard
                name={booking.name}
                state={booking.state}
                city={booking.city}
                phoneno={booking.mobile}
                quality={booking.material}
                weight={booking.weight}
                quantity={booking.quantity}
                key={ind}
              />
            ))
          )}
        </Container>
      </div>
    );
  }
}

export default withRouter(DriverDashboard);
