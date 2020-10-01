import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import { AuthContext } from '../Contexts/AuthContext';
import config from '../keys.config';

const PREFIX: string = config.jwtPrefix;

export default class App extends Component {
	static contextType = AuthContext;

	componentDidMount() {
		this.checkLocalStorage();
	}

	checkLocalStorage = (): void => {
		const { updateJWT } = this.context;
		let localStorageJWT: string | null = localStorage.getItem(PREFIX);
		if (localStorageJWT !== null && localStorageJWT !== undefined)
			updateJWT(localStorageJWT);
	};

	render() {
		const { jwt } = this.context;
		return jwt ? <Dashboard /> : <Login />;
	}
}
