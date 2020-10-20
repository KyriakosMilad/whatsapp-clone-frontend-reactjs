import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DashboardLayoutContext } from '../Contexts/DashboardLayoutContext';
import ChatCard from './ChatCard';
import userDefaultImg from './Images/user.jpg';

interface Props {}

interface State {
	showNewGroupModal: boolean;
	newGroupName: string;
}

export default class Conversations extends Component<Props, State> {
	static contextType = DashboardLayoutContext;

	constructor(props: Props) {
		super(props);

		this.state = {
			showNewGroupModal: false,
			newGroupName: '',
		};
	}

	handleCloseNewGroupModal = (): void => {
		this.setState({ showNewGroupModal: false });
	};

	showNewGroupModal = (): void => {
		this.setState({ showNewGroupModal: true });
	};

	handleChangeNewGroupName = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ newGroupName: e.target.value });
	};

	render() {
		let { toogleSidebar } = this.context;

		return (
			<>
				<Form.Group className="px-3 mb-0 pb-3 search-input">
					<Form.Control
						className="mt-3"
						type="text"
						name="search"
						placeholder="search conversations..."
					/>
				</Form.Group>
				<div className="sidebarMain overflow-auto flex-grow-1">
					<ChatCard
						id={'1'}
						name="Kyriakos"
						image={userDefaultImg}
						lastMessage="It is a long established fact that a reader will..."
						lastMessageDate="15:22"
					/>
				</div>
				<div className="toogleSidebarButton">
					<Button variant="success" onClick={toogleSidebar}>
						<FontAwesomeIcon icon={faAddressBook} />
					</Button>
				</div>
				<Button
					type="button"
					variant="primary"
					className="w-100 showModalButton"
					onClick={this.showNewGroupModal}
				>
					New group
				</Button>
				<Modal
					show={this.state.showNewGroupModal}
					onHide={this.handleCloseNewGroupModal}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title>Create new group</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group>
								<Form.Label>Enter new group name:</Form.Label>
								<Form.Control
									type="text"
									name="newGroupName"
									onChange={this.handleChangeNewGroupName}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleCloseNewGroupModal}>
							Close
						</Button>
						<Button
							type="submit"
							variant="success"
							onClick={this.handleCloseNewGroupModal}
						>
							Create
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		);
	}
}
