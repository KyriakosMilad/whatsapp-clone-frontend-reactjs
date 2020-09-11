import React, { Component } from 'react';
import { Col, Form, Row, Button } from 'react-bootstrap';
import ChatCard from './ChatCard';
import './Sidebar.css';

export default class Sidebar extends Component {
	render() {
		return (
			<Col md={4} className="Sidebar px-0">
				<Form.Group className="px-3">
					<Form.Control
						className="mt-3"
						type="text"
						name="search"
						placeholder="search chats..."
					></Form.Control>
				</Form.Group>
				<div className="chatCards">
					<ChatCard
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="هناك حقيقة مثبتة منذ زمن طويل وهي..."
						lastMessageDate="15:22"
					/>
				</div>
				<Row className="buttonsRow mx-0">
					<Col sm={6} className="px-0">
						<Button type="button" className="w-100 newChatButton">New chat</Button>
					</Col>
					<Col sm={6} className="px-0">
						<Button type="button" variant="success" className="w-100 newContactButton">New contact</Button>
					</Col>
				</Row>
			</Col>
		);
	}
}
