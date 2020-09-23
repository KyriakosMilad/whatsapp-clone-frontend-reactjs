import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

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

	handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
	};

	render() {
		return (
			<Container
				className="d-flex align-items-center"
				style={{ height: '100vh' }}
			>
				{this.state.showNumber ? <h1>{this.state.phoneNumber}</h1> : ''}
				<Form className="w-100" onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Enter your phone number:</Form.Label>
						<Form.Control
							type="text"
							name="phoneNumber"
							onChange={this.handleChange}
						></Form.Control>
					</Form.Group>
					<Button type="submit" variant="success" className="mr-2">
						Sign in
					</Button>
				</Form>
			</Container>
		);
	}
}
