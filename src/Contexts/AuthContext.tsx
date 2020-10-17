import React, { Component, createContext } from 'react';
import axios from 'axios';
import config from '../keys.config';

interface Props {}
interface State {
	jwt: string;
	authId: string;
}

const JWT_PREFIX: string = config.jwtPrefix;
const AUTH_ID_PREFIX: string = config.authIdPrefix;

export const AuthContext = createContext({
	jwt: '',
	authId: '',
	updateJWT: (jwt: string, authId: string) => {},
});

export class AuthProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { jwt: '', authId: '' };
	}

	checkJWT = (jwt: string): Promise<boolean> => {
		return axios
			.post(config.hostname + '/api/users/verifyjwt', {
				jwt: jwt,
			})
			.then((res) => {
				if (res.data.valid === true) return true;
				this.setState({ jwt: '' });
				return false;
			})
			.catch((err) => {
				this.setState({ jwt: '' });
				return false;
			});
	};

	updateJWT = (jwt: string, authId: string): void => {
		if (this.checkJWT(jwt)) {
			localStorage.setItem(JWT_PREFIX, jwt);
			localStorage.setItem(AUTH_ID_PREFIX, authId);
			this.setState({ jwt: jwt, authId: authId });
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
