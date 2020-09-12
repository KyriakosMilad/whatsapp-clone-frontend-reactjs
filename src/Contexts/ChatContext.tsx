import React, { Component, createContext } from 'react';

interface Props {}
interface State {
	showChat: boolean;
}

export const ChatContext = createContext({
	showChat: false,
	toogleChat: () => {},
});

export class ChatProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { showChat: false };
	}

	toogleChat = () => {
		this.setState({ showChat: !this.state.showChat });
	};

	render() {
		return (
			<ChatContext.Provider
				value={{
					...this.state,
					toogleChat: this.toogleChat,
				}}
			>
				{this.props.children}
			</ChatContext.Provider>
		);
	}
}
