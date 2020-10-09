import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DashboardLayoutContext } from '../Contexts/DashboardLayoutContext';
import ChatCard from './ChatCard';
import userDefaultImg from './Images/user.jpg';
import Loader from './Loader';
import config from '../keys.config';

const LOCAL_STORAGE_JWT_KEY: string = config.jwtPrefix;

interface Props {}

interface State {
	showNewContactModal?: boolean;
	newContactPhoneNumber?: string;
	newContactName?: string;
	loading?: boolean;
	errMsg?: string;
	successMsg?: string;
}

export default class Conversations extends Component<Props, State> {
	static contextType = DashboardLayoutContext;

	constructor(props: Props) {
		super(props);

		this.state = {
			showNewContactModal: false,
			newContactPhoneNumber: '',
			newContactName: '',
			loading: false,
			errMsg: '',
			successMsg: '',
		};
	}

	handleCloseNewContactModal = (): void => {
		this.setState({
			showNewContactModal: false,
			newContactPhoneNumber: '',
			newContactName: '',
			errMsg: '',
			successMsg: '',
		});
	};

	showNewContactModal = (): void => {
		this.setState({ showNewContactModal: true });
	};

	handleChangeNewContactInfo = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		this.setState({
			[e.target.name]: e.target.value,
		} as Pick<State, keyof State>);
	};

	handleSubmitCreateNewContact = (
		evt: React.FormEvent<HTMLFormElement>
	): void => {
		evt.preventDefault();
		this.setState({ loading: true }, () => {
			axios
				.post(
					config.hostname + '/api/auth/contacts/create',
					{
						phoneNumber: this.state.newContactPhoneNumber,
						name: this.state.newContactName,
					},
					{
						headers: {
							Authorization:
								'bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_KEY),
						},
					}
				)
				.then((res) => {
					this.setState({
						errMsg: '',
						successMsg: res.data.message,
						newContactName: '',
						newContactPhoneNumber: '',
						loading: false,
					});
				})
				.catch((err) => {
					if (err.response && err.response.data.message) {
						this.setState({
							successMsg: '',
							errMsg: err.response.data.message[0],
							loading: false,
						});
					} else {
						this.setState({
							successMsg: '',
							errMsg: 'Unexpected server error occurred!',
							loading: false,
						});
					}
				});
		});
	};

	render() {
		const { toogleSidebar } = this.context;

		return (
			<>
				<Loader loading={this.state.loading ? true : false} />
				<Form.Group className="px-3 mb-0 pb-3 search-input">
					<Form.Control
						className="mt-3"
						type="text"
						name="search"
						placeholder="search contacts..."
					></Form.Control>
				</Form.Group>
				<div className="sidebarMain overflow-auto flex-grow-1">
					<ChatCard id={1} name="Kyriakos" image={userDefaultImg} />
				</div>
				<div className="toogleSidebarButton">
					<Button variant="primary" onClick={toogleSidebar}>
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
					<Form onSubmit={this.handleSubmitCreateNewContact}>
						<Modal.Header closeButton>
							<Modal.Title>
								Add new contact
								{this.state.errMsg ? (
									<span className="errMsg d-block h6">{this.state.errMsg}</span>
								) : null}
								{this.state.successMsg ? (
									<span className="successMsg d-block h6">
										{this.state.successMsg}
									</span>
								) : null}
							</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							<Form.Group>
								<Form.Label>Enter new contact name:</Form.Label>
								<Form.Control
									type="text"
									name="newContactName"
									onChange={this.handleChangeNewContactInfo}
									value={this.state.newContactName}
								></Form.Control>
								<Form.Label className="mt-3">
									Enter new contact phone number:
								</Form.Label>
								<Form.Control
									type="text"
									name="newContactPhoneNumber"
									onChange={this.handleChangeNewContactInfo}
									value={this.state.newContactPhoneNumber}
								></Form.Control>
							</Form.Group>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={this.handleCloseNewContactModal}
							>
								Close
							</Button>
							<Button type="submit" variant="success">
								Add
							</Button>
						</Modal.Footer>
					</Form>
				</Modal>
			</>
		);
	}
}
