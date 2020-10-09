import React, { Component, createContext } from 'react';

interface Props {}
interface State {
	showChat: boolean;
	showContacts: boolean;
	chatId: string;
}

export const DashboardLayoutContext = createContext({
	showChat: false,
	showContacts: false,
	chatId: '',
	hideChat: () => {},
	toogleSidebar: () => {},
	changeChatId: (newChatId: string) => {},
});

export class DashboardLayoutProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { showChat: false, showContacts: false, chatId: '' };
	}

	hideChat = (): void => {
		this.setState({ showChat: false });
	};

	changeChatId = (newChatId: string): void => {
		this.setState({ chatId: String(newChatId), showChat: true });
	};

	toogleSidebar = (): void => {
		this.setState({ showContacts: !this.state.showContacts });
	}

	render() {
		return (
			<DashboardLayoutContext.Provider
				value={{
					...this.state,
					hideChat: this.hideChat,
					toogleSidebar: this.toogleSidebar,
					changeChatId: this.changeChatId,
				}}
			>
				{this.props.children}
			</DashboardLayoutContext.Provider>
		);
	}
}
