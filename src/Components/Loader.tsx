import React, { Component } from 'react';
import './Styles/Loader.css';

interface Props {
	loading: boolean;
}

export default class Loader extends Component<Props> {
	render() {
		return <div className={this.props.loading ? 'loader' : 'd-none'}>
      <div className="loading-spinner"></div>
    </div>;
	}
}
