import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Sidebar from './Sidebar';

export default class Dashboard extends Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Sidebar />
					<Col md={10}>1 of 1</Col>
				</Row>
			</Container>
		);
	}
}
