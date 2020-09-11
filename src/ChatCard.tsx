import React, { Component } from 'react';
import './ChatCard.css';

interface Props {
	name: string;
	image: string;
	lastMessage: string;
	lastMessageDate: string;
}

export default class ChatCard extends Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render() {
		return (
			<a href="#" className="chatCard--link">
				<div className="chatCard p-2">
					<img
						src={this.props.image}
						alt={this.props.name}
						className="rounded-circle"
						width="50"
						height="50"
					/>
					<span className="float-right mt-2 chatCard--lastMessageDate">{this.props.lastMessageDate}</span>
					<div className="d-inline ml-2">
						<span className="chatCard--name">{this.props.name}</span>
						<p className="chatCard--lastMessage ml-5">{this.props.lastMessage}</p>
					</div>
				</div>
			</a>
		);
	}
}
