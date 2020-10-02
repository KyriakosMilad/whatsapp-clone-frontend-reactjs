import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { ChatContext } from '../Contexts/ChatContext';
import './Styles/Sidebar.css';
// import Contacts from './Contacts';
import Conversations from './Conversations';
export default class Sidebar extends Component {
	static contextType = ChatContext;

	render() {
		const { showChat } = this.context;

		return (
			<Col
				md={4}
				className={
					showChat
						? 'Sidebar px-0 flex-column hide-sidebar-sm'
						: 'Sidebar px-0 flex-column'
				}
			>
				{/* <Contacts /> */}
				<Conversations />
			</Col>
		);
	}
}
