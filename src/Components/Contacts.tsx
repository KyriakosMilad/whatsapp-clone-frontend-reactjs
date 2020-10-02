import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ChatCard from './ChatCard';

interface Props {}

interface State {
	showNewContactModal: boolean;
	newContactPhoneNumber: string;
}

export default class Conversations extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			showNewContactModal: false,
			newContactPhoneNumber: '',
		};
	}

	handleCloseNewContactModal = (): void => {
		this.setState({ showNewContactModal: false });
	};

	showNewContactModal = (): void => {
		this.setState({ showNewContactModal: true });
	};

	handleChangeNewContactPhoneNumber = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		this.setState({ newContactPhoneNumber: e.target.value });
	};

	render() {
		return (
			<>
				<Form.Group className="px-3 mb-0 pb-3 search-input">
					<Form.Control
						className="mt-3"
						type="text"
						name="search"
						placeholder="search contacts..."
					></Form.Control>
				</Form.Group>
				<div className="sidebarMain overflow-auto flex-grow-1">
					<ChatCard
						id={1}
						name="Kyriakos"
						image="http://lorempixel.com/output/people-h-c-1141-1147-8.jpg"
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
				</div>
				<div className="toogleSidebarButton">
					 <Button variant="primary">
						<FontAwesomeIcon icon={faComments} />
					</Button>
				</div>
				<Button
					type="button"
					variant="success"
					className="w-100 showModalButton"
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
			</>
		);
	}
}
