import React, { Component } from 'react';
import { DashboardLayoutContext } from '../Contexts/DashboardLayoutContext';
import './Styles/ChatCard.css';

interface Props {
	id: number;
	name: string;
	image: string;
	lastMessage?: string;
	lastMessageDate?: string;
}

export default class ChatCard extends Component<Props> {
	static contextType = DashboardLayoutContext;

	changeChatId = (): void => {
		const { changeChatId } = this.context;
		changeChatId(this.props.id);
	};


	render() {
		return (
			<a href="/#" className="chatCard--link" onClick={this.changeChatId}>
				<div className="chatCard p-2">
					<img
						src={this.props.image}
						alt={this.props.name}
						className="rounded-circle"
						width="50"
						height="50"
					/>
					<span className="float-right mt-2 chatCard--lastMessageDate">
						{this.props.lastMessageDate}
					</span>
					<div className="d-inline ml-2">
						<span className="chatCard--name">{this.props.name}</span>
						<p className="chatCard--lastMessage ml-5">
							{this.props.lastMessage}
						</p>
					</div>
				</div>
			</a>
		);
	}
}
