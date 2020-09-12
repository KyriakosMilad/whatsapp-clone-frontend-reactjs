import React, { Component } from 'react';
import './Styles/Message.css'
interface Props {
	message: string;
	messageSent: boolean;
}

export default class Message extends Component<Props> {
	render() {
		return (
			<div
				className={
					this.props.messageSent
						? 'Message d-flex justify-content-end Message sentMessage'
						: 'Message d-flex justify-content-start Message recivedMessage'
				}
			>
				<p className="p-2" dir="auto">{this.props.message}</p>
			</div>
		);
	}
}
