import React, { Component } from 'react';
import {Container, Row} from 'react-bootstrap';
import Sidebar from './Sidebar';
import Chat from './Chat';
import './Styles/Dashboard.css';

export default class Dashboard extends Component {
	render() {
		return (
			<Container className="dashboardContainer">
				<Row className="h-100 d-flex">
					<Sidebar />
					<Chat />
				</Row>
			</Container>
		);
	}
}
