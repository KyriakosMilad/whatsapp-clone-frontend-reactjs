import React from 'react';
// import Dashboard from './Dashboard';
import Login from './Login';
import { ChatProvider } from '../Contexts/ChatContext';

function App() {
	return (
		<ChatProvider>
			<Login />
		</ChatProvider>
	);
}

export default App;
