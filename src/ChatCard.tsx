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
				<div className="chatCard">
					<img
						src={this.props.image}
						alt={this.props.name}
						className="rounded-circle"
						width="50"
						height="50"
					/>
					<span className="float-right mt-2">{this.props.lastMessageDate}</span>
					<div className="d-inline ml-2">
						<span>{this.props.name}</span>
						<p>{this.props.lastMessage}</p>
					</div>
				</div>
			</a>
		);
	}
}
