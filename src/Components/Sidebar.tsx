import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { DashboardLayoutContext } from '../Contexts/DashboardLayoutContext';
import './Styles/Sidebar.css';
import Contacts from './Contacts';
import Conversations from './Conversations';

export default class Sidebar extends Component {
	static contextType = DashboardLayoutContext;

	render() {
		const { showChat, showContacts } = this.context;

		return (
			<Col
				md={4}
				className={
					showChat
						? 'Sidebar px-0 flex-column hide-sidebar-sm'
						: 'Sidebar px-0 flex-column'
				}
			>
				{showContacts ? <Contacts /> : <Conversations />}
			</Col>
		);
	}
}
