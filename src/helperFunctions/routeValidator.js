const routeValidator = ({
	route1FromState,
	route1FromCity,
	route1toState,
	route1toCity,
	route2FromState,
	route2FromCity,
	route2toState,
	route2toCity,
	route3FromState,
	route3FromCity,
	route3toState,
	route3toCity,
}) => {
	console.log(route1FromState);
	if (route1FromState === route1toState && route1FromCity === route1toCity) {
		throw new Error(
			"In Route-1 From and TO are same, please keep them different"
		);
	}

	if (route2FromState === route2toState && route2FromCity === route2toCity) {
		throw new Error(
			"In Route-2 From and TO are same, please keep them different"
		);
	}

	if (route3FromState === route3toState && route3FromCity === route3toCity) {
		throw new Error(
			"In Route-3 From and TO are same, please keep them different"
		);
	}

	if (
		route1FromState === route2FromState &&
		route1FromCity === route2FromCity &&
		route1toState === route2toState &&
		route1toCity === route2toCity
	) {
		throw new Error(
			"Route-1 and Route-2 are same, please keep them different"
		);
	}

	if (
		route1FromState === route3FromState &&
		route1FromCity === route3FromCity &&
		route1toState === route3toState &&
		route1toCity === route3toCity
	) {
		throw new Error(
			"Route-1 and Route-3 are same, please keep them different"
		);
	}

	if (
		route3FromState === route2FromState &&
		route3FromCity === route2FromCity &&
		route3toState === route2toState &&
		route3toCity === route2toCity
	) {
		throw new Error(
			"Route-2 and Route-3 are same, please keep them different"
		);
	}
};

export default routeValidator;
