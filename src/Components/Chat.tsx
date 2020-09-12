import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { ChatContext } from '../Contexts/ChatContext';
import './Chat.css'

export default class Chat extends Component {
	static contextType = ChatContext;

	render() {
		const { showChat, toogleChat } = this.context;

		return (
			<Col md={8} className={showChat ? 'Chat' : 'Chat hide-chat-sm'}>
				<a href="/#" onClick={toogleChat}>hide chat</a>
			</Col>
		);
	}
}
