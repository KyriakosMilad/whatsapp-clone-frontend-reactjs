import React, { Component, createContext } from 'react';

interface Props {}
interface State {
	showChat: boolean;
	chatId: number;
}

export const ChatContext = createContext({
	showChat: false,
	chatId: 0,
	hideChat: () => {},
	changeChatId: (e: React.ChangeEvent<HTMLInputElement>) => {},
});

export class ChatProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { showChat: false, chatId: 0 };
	}

	hideChat = () => {
		this.setState({ showChat: false });
	};

	changeChatId = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newChatId = e.currentTarget.id.split('conversationId--')[1];
		this.setState({ chatId: Number(newChatId), showChat: true  });
	};

	render() {
		return (
			<ChatContext.Provider
				value={{
					...this.state,
					hideChat: this.hideChat,
					changeChatId: this.changeChatId,
				}}
			>
				{this.props.children}
			</ChatContext.Provider>
		);
	}
}
