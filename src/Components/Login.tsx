import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Loader from './Loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Styles/Login.css';
import axios from 'axios';

interface Props {}

interface State {
	phoneNumber?: string;
	authCodeCreated?: boolean;
	loading?: boolean;
	authCode?: number;
	errMsg?: string;
}

export default class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			authCodeCreated: false,
			loading: false,
		};
	}

	handlePhoneNumberChange = (value: string): void => {
		this.setState({ phoneNumber: '+' + value });
	};

	handleSubmitCreateAuthCode = (
		evt: React.FormEvent<HTMLFormElement>
	): void => {
		evt.preventDefault();
		this.setState({ loading: true }, () => {
			axios
				.post('http://localhost:4300/api/users/signin', {
					phoneNumber: this.state.phoneNumber,
				})
				.then((res) => {
					console.log(res);
					if (res.data.status === 'queued') {
						this.setState({
							errMsg: '',
							authCodeCreated: true,
							loading: false,
						});
					} else {
						this.setState({
							errMsg: 'Make sure you enter valid phone number',
							loading: false,
						});
					}
				})
				.catch((err) => {
					this.setState({
						errMsg: 'Make sure you enter valid phone number',
						loading: false,
					});
				});
		});
	};

	handleAuthCodeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ authCode: Number(evt.target.value) }, () => {
			if (this.state.authCode?.toString().length === 6) {
				this.setState({ loading: true }, () => {
					axios
						.post('http://localhost:4300/api/users/verify', {
							phoneNumber: this.state.phoneNumber,
							authCode: this.state.authCode,
						})
						.then((res) => {
							console.log(res);
							this.setState({ errMsg: '', loading: false });
						})
						.catch((err) => {
							this.setState({
								errMsg:
									'auth code not valid, try again and make sure to right the code you recived correctly',
								loading: false,
							});
						});
				});
			}
		});
	};

	render() {
		return (
			<Container
				className="d-flex align-items-center"
				style={{ height: '100vh' }}
			>
				<Loader loading={this.state.loading ? true : false} />
				{!this.state.authCodeCreated ? (
					<Form className="w-100" onSubmit={this.handleSubmitCreateAuthCode}>
						<Form.Group>
							<Form.Label>Enter your phone number:</Form.Label>
							<PhoneInput
								country={'eg'}
								preferredCountries={['eg']}
								placeholder="Enter your phone number..."
								excludeCountries={['il']}
								onChange={this.handlePhoneNumberChange}
								enableSearch={true}
							/>
							{this.state.errMsg ? (
								<span className="errMsg">{this.state.errMsg}</span>
							) : null}
						</Form.Group>
						<Button type="submit" variant="success" className="mr-2">
							Sign in
						</Button>
					</Form>
				) : (
					<Form className="w-100">
						<Form.Group>
							<Form.Label style={{ fontSize: '20px' }}>
								Enter auth code sent to your phone number:
							</Form.Label>
							{this.state.errMsg ? (
								<span className="errMsg d-block">{this.state.errMsg}</span>
							) : null}
							<Form.Control
								onChange={this.handleAuthCodeChange}
								className="authCodeInput p-0 m-auto"
								maxLength={6}
							/>
						</Form.Group>
					</Form>
				)}
			</Container>
		);
	}
}
