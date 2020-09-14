import React, { Component } from 'react';
import { Col, Form, Button, Modal } from 'react-bootstrap';
import ChatCard from './ChatCard';
import { ChatContext } from '../Contexts/ChatContext';
import './Styles/Sidebar.css';

interface Props {}
interface State {
	showNewContactModal: boolean;
	newContactPhoneNumber: string;
}

export default class Sidebar extends Component<Props, State> {
	static contextType = ChatContext;

	constructor(props: Props) {
		super(props);

		this.state = {
			showNewContactModal: false,
			newContactPhoneNumber: '',
		};
	}

	handleCloseNewContactModal = () => {
		this.setState({ showNewContactModal: false });
	};

	showNewContactModal = () => {
		this.setState({ showNewContactModal: true });
	};

	handleChangeNewContactPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		this.setState({ newContactPhoneNumber: e.target.value });
	};

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
						id={20}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
					<ChatCard
						id={30}
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
				<Button
					type="button"
					variant="success"
					className="w-100 newContactButton"
					onClick={this.showNewContactModal}
				>
					New contact
				</Button>
				<Modal
					show={this.state.showNewContactModal}
					onHide={this.handleCloseNewContactModal}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Add new contact</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Enter new contact phone number:</Form.Label>
								<Form.Control
									type="text"
									name="newContactPhoneNumber"
									onChange={this.handleChangeNewContactPhoneNumber}
								></Form.Control>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={this.handleCloseNewContactModal}
						>
							Close
						</Button>
						<Button
							type="submit"
							variant="success"
							onClick={this.handleCloseNewContactModal}
						>
							Add
						</Button>
					</Modal.Footer>
				</Modal>
			</Col>
		);
	}
}
