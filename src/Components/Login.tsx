import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Loader from './Loader';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './Styles/Login.css';

interface Props {}

interface State {
	phoneNumber?: string;
	showNumber?: boolean;
	loading?: boolean;
}

export default class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			phoneNumber: '',
			showNumber: false,
			loading: false,
		};
	}

	handlePhoneNumberChange = (value: string) => {
		this.setState({ phoneNumber: '+' + value });
	};

	handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
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
				{this.state.showNumber ? <h1>{this.state.phoneNumber}</h1> : ''}
				<Form className="w-100" onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Enter your phone number:</Form.Label>
						<PhoneInput
							country={'eg'}
							preferredCountries={['eg']}
							placeholder="+20"
							value={this.state.phoneNumber}
							excludeCountries={['il']}
							onChange={this.handlePhoneNumberChange}
							enableSearch={true}
						/>
					</Form.Group>
					<Button type="submit" variant="success" className="mr-2">
						Sign in
					</Button>
				</Form>
			</Container>
		);
	}
}
