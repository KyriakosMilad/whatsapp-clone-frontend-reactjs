import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Loader from './Loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Styles/Login.css';

interface Props {}

interface State {
	phoneNumber?: string;
	authCodeCreated?: boolean;
	loading?: boolean;
	authCode?: number;
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

	handleAuthCodeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({ authCode: Number(evt.target.value) }, () => {
			if (this.state.authCode?.toString().length === 6) {
				this.setState({ loading: true });
			}
		});
	};

	handleSubmitCreateAuthCode = (
		evt: React.FormEvent<HTMLFormElement>
	): void => {
		evt.preventDefault();
		this.setState({ loading: true });
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
								placeholder="+20"
								excludeCountries={['il']}
								onChange={this.handlePhoneNumberChange}
								enableSearch={true}
							/>
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
