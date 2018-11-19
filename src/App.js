import React, { Component } from 'react';
import Loader from './shareds/loader';
import './App.scss';
import './assets/stylesheets/components/buttons.scss';
import './assets/stylesheets/helpers/space.scss';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mock: true,
			blur: true,
			loader: false,
			planet: {
				name: 'Planet name',
				population: '300.254.10',
				climate: 'Lorem',
				terrain: 'Dolor sit',
				films: [ 'https://swapi.co/api/films/5/' ]
			}
		};

		this.generateNum = this.generateNum.bind(this);
	}

	loadPlanets = async (planet) => {
		this.setState({ loader: true });
		await fetch(`https://swapi.co/api/planets/${planet}`)
			.then((response) => response.json())
			.then((result) => {
				this.setState({ planet: result, mock: false, blur: true, loader: false });
			})
			.catch((err) => {
				console.error('Failed retrieving information', err);
			});
	};

	generateNum() {
		let min = 1,
			max = 60;
		let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		this.loadPlanets(randomNumber);
	}

	pluralize(count, noun, suffix = 's') {
		return ` ${count} ${noun}${count >= 2 ? suffix : ''}`;
	}

	removeBlur() {
		this.setState({ blur: false });
	}

	renderButton() {
		const { mock, blur } = this.state;

		if (!mock && blur) {
			return (
				<button className="sw-btn sw-btn-outline" onClick={this.removeBlur.bind(this)}>
					Show
				</button>
			);
		}
	}

	render() {
		const { planet, mock, blur, loader } = this.state;

		if (loader) return <Loader />;

		return (
			<main className="container stars large">
				<div className="card">
					<div className="bg-sw">
						<img
							className="wordmark"
							src="http://res.cloudinary.com/prvnbist/image/upload/v1508603572/starwars.png"
							alt="star wars"
						/>
					</div>
					<div className="planet-info">
						<img
							className="helmet"
							src="http://res.cloudinary.com/prvnbist/image/upload/v1508603573/helmet.png"
							alt="helmet"
						/>
						<div className="description">
							<h1 className="name">{planet.name}</h1>
							<dl className={blur ? 'info text-blur' : 'info'}>
								<dt>Population:</dt>
								<dd>{planet.population}</dd>
								<dt>Climate:</dt>
								<dd>{planet.climate}</dd>
								<dt>Terrain:</dt>
								<dd>{planet.terrain}</dd>
								<dt>
									Feature in
									<span>{this.pluralize(planet.films.length, 'film')}</span>
								</dt>
							</dl>
							<button className="sw-btn sw-btn-primary sw-md-margin-right" onClick={this.generateNum}>
								{mock ? "Let's play" : 'Next'}
							</button>
							{this.renderButton()}
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default App;
