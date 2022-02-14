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
import { withRouter } from "../../customHooks/WithRouter";

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
			route1FromState: "",
			route1FromCity: "",
			route1toState: "",
			route1toCity: "",
			route2FromState: "",
			route2FromCity: "",
			route2toState: "",
			route2toCity: "",
			route3FromState: "",
			route3FromCity: "",
			route3toState: "",
			route3toCity: "",
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
										Password (min-length: 6, atleast one no.
										and one special character)
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
											this.state.password !==
											this.state.confirm
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
									<Form.Label>
										Truck Capacity (Rounded in Kgs)
									</Form.Label>

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
									<Form.Label>
										Driving Experience (Rounded in Yrs)
									</Form.Label>

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
							<Col
								lg="auto"
								md="auto"
								style={{ marginLeft: "40px" }}
							>
								From:
							</Col>
							<Col>
								<Form.Select
									required
									value={this.state.route1FromState}
									onChange={this.handleChange}
									name="route1FromState"
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
									value={this.state.route1FromCity}
									onChange={this.handleChange}
									name="route1FromCity"
								>
									<option value="" defaultValue>
										Select City
									</option>
									{this.state.route1FromState !== "" &&
										Routedict[
											this.state.route1FromState
										].map((st) => (
											<option value={st}>{st}</option>
										))}
								</Form.Select>
							</Col>
							<Col
								lg="auto"
								md="auto"
								style={{ marginLeft: "20px" }}
							>
								To:
							</Col>
							<Col>
								<Form.Select
									required
									value={this.state.route1toState}
									onChange={this.handleChange}
									name="route1toState"
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
									value={this.state.route1toCity}
									onChange={this.handleChange}
									name="route1toCity"
								>
									<option value="" defaultValue>
										Select City
									</option>
									{this.state.route1toState !== "" &&
										Routedict[this.state.route1toState].map(
											(st) => (
												<option value={st}>{st}</option>
											)
										)}
								</Form.Select>
							</Col>
						</Row>
						<Row className="mb-2">
							<Col lg="auto" md="auto">
								Route 2:
							</Col>
							<Col
								lg="auto"
								md="auto"
								style={{ marginLeft: "40px" }}
							>
								From:
							</Col>
							<Col>
								<Form.Select
									required
									value={this.state.route2FromState}
									onChange={this.handleChange}
									name="route2FromState"
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
									value={this.state.route2FromCity}
									onChange={this.handleChange}
									name="route2FromCity"
								>
									<option value="" defaultValue>
										Select City
									</option>
									{this.state.route2FromState !== "" &&
										Routedict[
											this.state.route2FromState
										].map((st) => (
											<option value={st}>{st}</option>
										))}
								</Form.Select>
							</Col>
							<Col
								lg="auto"
								md="auto"
								style={{ marginLeft: "20px" }}
							>
								To:
							</Col>
							<Col>
								<Form.Select
									required
									value={this.state.route2toState}
									onChange={this.handleChange}
									name="route2toState"
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
									value={this.state.route2toCity}
									onChange={this.handleChange}
									name="route2toCity"
								>
									<option value="" defaultValue>
										Select City
									</option>
									{this.state.route2toState !== "" &&
										Routedict[this.state.route2toState].map(
											(st) => (
												<option value={st}>{st}</option>
											)
										)}
								</Form.Select>
							</Col>
						</Row>
						<Row className="mb-2">
							<Col lg="auto" md="auto">
								Route 3:
							</Col>
							<Col
								lg="auto"
								md="auto"
								style={{ marginLeft: "40px" }}
							>
								From:
							</Col>
							<Col>
								<Form.Select
									required
									value={this.state.route3FromState}
									onChange={this.handleChange}
									name="route3FromState"
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
									value={this.state.route3FromCity}
									onChange={this.handleChange}
									name="route3FromCity"
								>
									<option value="" defaultValue>
										Select City
									</option>
									{this.state.route3FromState !== "" &&
										Routedict[
											this.state.route3FromState
										].map((st) => (
											<option value={st}>{st}</option>
										))}
								</Form.Select>
							</Col>
							<Col
								lg="auto"
								md="auto"
								style={{ marginLeft: "20px" }}
							>
								To:
							</Col>
							<Col>
								<Form.Select
									required
									value={this.state.route3toState}
									onChange={this.handleChange}
									name="route3toState"
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
									value={this.state.route3toCity}
									onChange={this.handleChange}
									name="route3toCity"
								>
									<option value="" defaultValue>
										Select City
									</option>
									{this.state.route3toState !== "" &&
										Routedict[this.state.route3toState].map(
											(st) => (
												<option value={st}>{st}</option>
											)
										)}
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
										this.state.password !==
											this.state.confirm ||
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
