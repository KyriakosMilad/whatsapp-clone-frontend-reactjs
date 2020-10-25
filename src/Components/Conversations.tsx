import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { DashboardLayoutContext } from '../Contexts/DashboardLayoutContext';
import ChatCard from './ChatCard';
import userDefaultImg from './Images/user.jpg';
import config from '../keys.config';

const LOCAL_STORAGE_JWT_KEY: string = config.jwtPrefix;

interface Props {}

interface State {
	showNewGroupModal: boolean;
	newGroupName: string;
	conversations: Array<{
		_id: string;
		name: string;
		lastMessage: string;
		lastMessageDate: string;
	}>;
	loadingSpinner: boolean;
	searchConversationsByName?: string;
}

export default class Conversations extends Component<Props, State> {
	static contextType = DashboardLayoutContext;

	constructor(props: Props) {
		super(props);

		this.state = {
			showNewGroupModal: false,
			newGroupName: '',
			conversations: [],
			loadingSpinner: false,
			searchConversationsByName: '',
		};
	}

	componentDidMount() {
		this.getConversations();
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

	getConversations = (): void => {
		this.setState({ loadingSpinner: true, conversations: [] }, () => {
			axios
				.get(config.hostname + '/api/auth/conversations', {
					params: {
						name: this.state.searchConversationsByName,
					},
					headers: {
						Authorization:
							'bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_KEY),
					},
				})
				.then((res) => {
					this.setState({
						conversations: res.data,
						loadingSpinner: false,
					});
				})
				.catch((err) => {
					this.setState({
						loadingSpinner: false,
					});
				});
		});
	};

	searchConversations = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ searchConversationsByName: e.currentTarget.value }, () => {
			this.getConversations();
		});
	};

	render() {
		let { toggleSidebar } = this.context;

		return (
			<>
				<Form.Group className="px-3 mb-0 pb-3 search-input">
					<Form.Control
						className="mt-3"
						type="text"
						name="search"
						placeholder="search conversations..."
						onChange={this.searchConversations}
					/>
				</Form.Group>
				<div className="sidebarMain overflow-auto flex-grow-1">
					{this.state.conversations!.map((value) => {
						return (
							<ChatCard
								key={value._id}
								id={value._id}
								name={value.name}
								image={userDefaultImg}
								lastMessage={value.lastMessage}
								lastMessageDate={value.lastMessageDate}
							/>
						);
					})}

					{this.state.loadingSpinner ? (
						<Spinner
							animation="grow"
							variant="success"
							className="mt-3"
							style={{ marginLeft: '45%' }}
						/>
					) : null}
				</div>
				<div className="toggleSidebarButton">
					<Button variant="success" onClick={toggleSidebar}>
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
