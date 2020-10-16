import axios from 'axios';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import config from '../keys.config';
import Loader from './Loader';
import { AuthContext } from '../Contexts/AuthContext';

interface Props {
	phoneNumber: string;
}

interface State {
	loading: boolean;
	authCode?: number;
	errMsg?: string;
}
export default class Auth extends Component<Props, State> {
	static contextType = AuthContext;

	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
		};
	}

	handleAuthCodeChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
		let { updateJWT } = this.context;
		this.setState({ authCode: Number(evt.target.value) }, () => {
			if (this.state.authCode?.toString().length === 6) {
				this.setState({ loading: true }, () => {
					axios
						.post(config.hostname + '/api/users/verify', {
							phoneNumber: this.props.phoneNumber,
							authCode: this.state.authCode,
						})
						.then((res) => {
							this.setState({ errMsg: '', loading: false });
							updateJWT(res.data.token);
						})
						.catch((err) => {
							if (err.response && err.response.data.message) {
								this.setState({
									errMsg: err.response.data.message[0],
									loading: false,
								});
							} else {
								this.setState({
									errMsg: 'Unexpected server error occurred!',
									loading: false,
								});
							}
						});
				});
			}
		});
	};

	render() {
		return (
			<Form className="w-100">
				<Loader loading={this.state.loading ? true : false} />
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
		);
	}
}
