import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import { AuthContext } from '../Contexts/AuthContext';
import config from '../keys.config';

const JWT_PREFIX: string = config.jwtPrefix;
const AUTH_ID_PREFIX: string = config.authIdPrefix;

export default class App extends Component {
	static contextType = AuthContext;

	componentDidMount() {
		this.checkLocalStorage();
	}

	checkLocalStorage = (): void => {
		const { updateJWT } = this.context;
		const localStorageJWT: string | null = localStorage.getItem(JWT_PREFIX);
		const localStorageAuthId: string | null = localStorage.getItem(AUTH_ID_PREFIX);
		if (localStorageJWT !== null && localStorageAuthId !== null)
			updateJWT(localStorageJWT, localStorageAuthId);
	};

	render() {
		const { jwt } = this.context;
		return jwt ? <Dashboard /> : <Login />;
	}
}
