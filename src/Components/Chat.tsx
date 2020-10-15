import React, { Component } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
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

	constructor(props: Props, context: typeof DashboardLayoutContext) {
		super(props, context);

		this.state = {
			newMessage: '',
			chatId: this.context.chatId,
			status: '',
			messages: [],
			loadingSpinner: false,
		};
	}

	componentDidMount() {
		this.getMessages();
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		if (this.state.chatId !== prevState.chatId) {
			this.getMessages();
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

	render() {
		const { showChat, hideChat, chatId, chatName, chatImg } = this.context;

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
							{this.state.messages!.map((value) => {
								return <Message message={value.message} messageSent={true} />;
							})}
						</div>
						<div className="typeMessage">
							<Form>
								<Form.Row className="align-items-center mt-3">
									<Col xs="8" className="ml-3">
										<Form.Control
											className="mb-2"
											placeholder="type your message..."
											onChange={this.handleChangeNewMessage}
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
