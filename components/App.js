import React from 'react';
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		

		// getinitalState
		this.state = {
			fishes: {},
			order: {}
		};
	}

	// componentWillMount is called once, before initial rendering
	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		// check if there is any order in localStorage
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

		if (localStorageRef) {
			// update our App component's order state
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	// called before a component is unmounted and destroyed
	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	// called before rendering when new props or state is received
	componentWillUpdate(nextProps, nextState) {
		console.log('Something Changed!');
		console.log({nextProps, nextState});

		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

	addFish(fish) {
		// update our state
		const fishes = {...this.state.fishes};
		// update in our new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;
		// set state
		this.setState({ fishes }); // same as this.setState({ fishes })
	}

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({ fishes });
	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		fishes[key] = null;
		this.setState({ fishes });
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		// take a copy of our state
		const order = {...this.state.order};
		// update or add the new number of fish ordered
		order[key] = order[key] + 1 || 1;
		// update our state
		this.setState({ order }); // same as this.setState({ order: order })
	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		// order[key] = null;
		// the above line still renders the objects name without any amount
		delete order[key];
		// delete works fine and removes the whole object
		this.setState({ order });
	}
	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object
								.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order 
					fishes={this.state.fishes} 
					order={this.state.order} 
					removeFromOrder={this.removeFromOrder}
					params={this.props.params}/>
				<Inventory 
					loadSamples={this.loadSamples} 
					addFish={this.addFish} 
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					storeId={this.props.params.storeId}
					fishes={this.state.fishes}/>
			</div>
			)
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
};

export default App;