import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

interface Props {}

interface State {
	phoneNumber: number;
	showNumber: number;
}

export default class Login extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			phoneNumber: 0,
			showNumber: 0,
		};
	}

	handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ [evt.target.name]: Number(evt.target.value) } as Pick<
			State,
			keyof State
		>);
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		this.setState({ showNumber: 1 });
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
