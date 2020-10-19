import React, { Component } from 'react';
import { Col, Form, Button, Spinner } from 'react-bootstrap';
import { DashboardLayoutContext } from '../Contexts/DashboardLayoutContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Styles/Chat.css';
import Message from './Message';
import userDefaultImg from './Images/user.jpg';
import axios from 'axios';
import config from '../keys.config';

const LOCAL_STORAGE_JWT_KEY: string = config.jwtPrefix;

interface Props {}
interface State {
	newMessage?: string;
	chatId?: string;
	status?: string;
	messages?: Array<{
		_id: string;
		message: string;
		conversationId: string;
		userId: string;
	}>;
	loadingSpinner?: boolean;
}

export default class Chat extends Component<Props, State> {
	static contextType = DashboardLayoutContext;

	constructor(props: Props) {
		super(props);

		this.state = {
			newMessage: '',
			chatId: '',
			status: '',
			messages: [],
			loadingSpinner: false,
		};
	}

	componentDidMount() {
		let { chatId } = this.context;

		this.setState({ chatId: chatId }, () => {
			this.getMessages();
		});
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		let { chatId } = this.context;

		if (chatId !== prevState.chatId) {
			this.setState({ chatId: chatId }, () => {
				this.getMessages();
			});
		}
	}

	handleChangeNewMessage = (e: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ newMessage: e.target.value });
	};

	scrollToLastMessage = (): void => {
		const messagesDiv = document.getElementById('messages')!;
		messagesDiv.scrollTop = messagesDiv.scrollHeight;
	};

	getMessages = (): void => {
		this.setState({ loadingSpinner: true }, () => {
			axios
				.get(config.hostname + '/api/auth/messages', {
					params: {
						chatId: this.state.chatId,
					},
					headers: {
						Authorization:
							'bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_KEY),
					},
				})
				.then((res) => {
					this.setState({
						messages: res.data,
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

	sendMessage = (evt: React.FormEvent<HTMLFormElement>): void => {
		evt.preventDefault();
		axios
			.post(
				config.hostname + '/api/auth/messages/create',
				{
					message: this.state.newMessage,
					chatId: this.state.chatId,
				},
				{
					headers: {
						Authorization:
							'bearar ' + localStorage.getItem(LOCAL_STORAGE_JWT_KEY),
					},
				}
			)
			.then((res) => {
				this.setState({
					newMessage: '',
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		let { showChat, hideChat, chatId, chatName, chatImg } = this.context;

		return (
			<Col
				md={8}
				className={
					showChat
						? 'Chat px-0 flex-column'
						: 'Chat hide-chat-sm flex-column px-0'
				}
			>
				{chatId ? (
					<>
						<div className="ChatHeader px-3 pt-4">
							<button className="backButton" onClick={hideChat}>
								<FontAwesomeIcon icon={faChevronLeft} />
							</button>
							<div className="d-inline">
								<img
									className="rounded-circle mb-4"
									src={userDefaultImg}
									width="60"
									height="60"
									alt="username"
								/>
							</div>
							<div className="d-inline-block ml-2">
								<span className="name">{chatName}</span>
								<br />
								<span>online</span>
							</div>
						</div>
						<div
							className="Messages overflow-auto flex-grow-1 p-3"
							id="messages"
						>
							{this.state.loadingSpinner ? (
								<Spinner
									animation="grow"
									variant="success"
									className="mt-3"
									style={{
										marginLeft: '45%',
									}}
								/>
							) : null}
							{this.state.messages!.map((value) => {
								return <Message message={value.message} messageSent={true} />;
							})}
						</div>
						<div className="typeMessage">
							<Form onSubmit={this.sendMessage}>
								<Form.Row className="align-items-center mt-3">
									<Col xs="8" className="ml-3">
										<Form.Control
											className="mb-2"
											placeholder="type your message..."
											onChange={this.handleChangeNewMessage}
											value={this.state.newMessage}
										/>
									</Col>
									<Col xs="2" className="">
										<Button
											type="submit"
											className="mb-2"
											disabled={
												this.state.newMessage!.length > 0 ? false : true
											}
										>
											Send
										</Button>
									</Col>
								</Form.Row>
							</Form>
						</div>
					</>
				) : null}
			</Col>
		);
	}
}
