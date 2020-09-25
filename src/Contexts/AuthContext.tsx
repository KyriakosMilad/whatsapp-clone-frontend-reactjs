import React, { Component, createContext } from 'react';
import axios from 'axios';
import config from '../keys.config';

interface Props {}
interface State {
	jwt: string;
}

const PREFIX: string = 'whatsapp-clong-jwt';

export const AuthContext = createContext({
	jwt: '',
	updateJWT: (jwt: string) => {},
});

export class AuthProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { jwt: '' };
	}

	checkJWT = (jwt: string): Promise<boolean> => {
		return axios
			.post(config.hostname + '/api/users/verifyjwt', {
				jwt: jwt,
			})
			.then((res) => {
				if (res.data === true) return true;
				return false;
			})
			.catch((err) => {
				this.setState({ jwt: '' });
				return false;
			});
	};

	updateJWT = (jwt: string): void => {
		if (this.checkJWT(jwt)) {
			localStorage.setItem(PREFIX, jwt);
			this.setState({ jwt: jwt });
		}
	};

	render() {
		return (
			<AuthContext.Provider
				value={{
					...this.state,
					updateJWT: this.updateJWT,
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
