import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default class Dashboard extends Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Col md={2}>1 of 1</Col>
					<Col md={10}>1 of 1</Col>
				</Row>
			</Container>
		);
	}
}
