import React, { Component, createContext } from 'react';

interface Props {}
interface State {
	showChat: boolean;
	showContacts: boolean;
	chatId: number;
}

export const DashboardLayoutContext = createContext({
	showChat: false,
	showContacts: false,
	chatId: 0,
	hideChat: () => {},
	toogleSidebar: () => {},
	changeChatId: (e: React.ChangeEvent<HTMLInputElement>) => {},
});

export class DashboardLayoutProvider extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { showChat: false, showContacts: false, chatId: 0 };
	}

	hideChat = (): void => {
		this.setState({ showChat: false });
	};

	changeChatId = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const newChatId = e.currentTarget.id.split('conversationId--')[1];
		this.setState({ chatId: Number(newChatId), showChat: true });
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
