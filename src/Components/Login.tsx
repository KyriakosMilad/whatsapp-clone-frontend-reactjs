import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Loader from './Loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Styles/Login.css';
import axios from 'axios';
import { AuthContext } from '../Contexts/AuthContext';
import config from '../keys.config';
import Auth from './Auth';

interface Props {}

interface State {
	phoneNumber?: string;
	authCodeCreated: boolean;
	loading: boolean;
	errMsg?: string;
}

export default class Login extends Component<Props, State> {
	static contextType = AuthContext;

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
				.post(config.hostname + '/api/users/signin', {
					phoneNumber: this.state.phoneNumber,
				})
				.then((res) => {
					this.setState({
						errMsg: '',
						authCodeCreated: true,
						loading: false,
					});
				})
				.catch((err) => {
					this.setState({
						errMsg: err.response.data.error,
						loading: false,
					});
				});
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
					<Auth phoneNumber={String(this.state.phoneNumber)} />
				)}
			</Container>
		);
	}
}
