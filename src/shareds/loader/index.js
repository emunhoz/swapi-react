import React, { Component } from 'react';
import './style.scss';

class Loader extends Component {
	render() {
		return (
			<div className="loader">
				<div className="spinner" />
			</div>
		);
	}
}

export default Loader;
