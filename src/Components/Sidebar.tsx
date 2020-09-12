import React, { Component } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import ChatCard from './ChatCard';
import { ChatContext } from '../Contexts/ChatContext';
import './Styles/Sidebar.css';

export default class Sidebar extends Component {
	static contextType = ChatContext;

	render() {
		const {  showChat } = this.context;

		return (
			<Col md={4} className={ showChat ? 'Sidebar px-0 flex-column hide-sidebar-sm' : 'Sidebar px-0 flex-column' }>
				<Form.Group className="px-3 mb-0 pb-3 search-input">
					<Form.Control
						className="mt-3"
						type="text"
						name="search"
						placeholder="search chats..."
					></Form.Control>
				</Form.Group>
				<div className="chatCards overflow-auto flex-grow-1">
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
				</div>
				<Row className="buttonsRow mx-0">
					<Col xs={6} className="px-0">
						<Button type="button" className="w-100 newChatButton">New chat</Button>
					</Col>
					<Col xs={6} className="px-0">
						<Button type="button" variant="success" className="w-100 newContactButton">New contact</Button>
					</Col>
				</Row>
			</Col>
		);
	}
}
