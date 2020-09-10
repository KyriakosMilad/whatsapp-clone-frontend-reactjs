import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Sidebar from './Sidebar';
import Chat from './Chat';

export default class Dashboard extends Component {
	render() {
		return (
			<Container fluid>
				<Row>
					<Sidebar />
					<Chat />
				</Row>
			</Container>
		);
	}
}
