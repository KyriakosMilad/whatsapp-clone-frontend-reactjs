import React, { Component, createContext } from 'react';

interface Props {}
interface State {
	showChat: boolean;
	showContacts: boolean;
	chatId: string;
	chatName: string;
	chatImg: string;
}

export const DashboardLayoutContext = createContext({
	showChat: false,
	showContacts: false,
	chatId: '',
	chatName: '',
	chatImg: '',
	hideChat: () => {},
	toggleSidebar: () => {},
	changeChatInfo: (
		newChatId: string,
		newChatImg: string,
		newChatName: string
	) => {},
});

export class DashboardLayoutProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			showChat: false,
			showContacts: false,
			chatId: '',
			chatName: '',
			chatImg: '',
		};
	}

	hideChat = (): void => {
		this.setState({ showChat: false });
	};

	changeChatInfo = (
		newChatId: string,
		newChatImg: string,
		newChatName: string
	): void => {
		this.setState({
			chatId: String(newChatId),
			chatImg: String(newChatImg),
			chatName: String(newChatName),
			showChat: true,
		});
	};

	toggleSidebar = (): void => {
		this.setState({ showContacts: !this.state.showContacts });
	};

	render() {
		return (
			<DashboardLayoutContext.Provider
				value={{
					...this.state,
					hideChat: this.hideChat,
					toggleSidebar: this.toggleSidebar,
					changeChatInfo: this.changeChatInfo,
				}}
			>
				{this.props.children}
			</DashboardLayoutContext.Provider>
		);
	}
}
