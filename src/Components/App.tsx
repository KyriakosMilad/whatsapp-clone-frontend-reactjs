import React from 'react';
import Dashboard from './Dashboard';
import { ChatProvider } from '../Contexts/ChatContext';

function App() {
	return (
		<ChatProvider>
			<Dashboard />
		</ChatProvider>
	);
}

export default App;
