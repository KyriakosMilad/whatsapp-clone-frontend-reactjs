import React, { Component } from 'react';
import {Container, Row} from 'react-bootstrap';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

export default class Dashboard extends Component {
	render() {
		return (
			<Container className="dashboardContainer">
				<Row>
					<Sidebar />
					<Chat />
				</Row>
			</Container>
		);
	}
}
