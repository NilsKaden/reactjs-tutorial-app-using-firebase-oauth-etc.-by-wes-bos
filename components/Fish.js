import React from 'react';
import {formatPrice} from '../helpers';

class Fish extends React.Component {
	render() {
		// the following line saves a bit of typing
		// by importing the props as constants we dont have to write this.props.x every time
		const {details, index} = this.props;
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';


		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
			</li>

		)
	}
}

Fish.propTypes = {
	addToOrder: React.PropTypes.func.isRequired,
	details: React.PropTypes.object.isRequired,
	index: React.PropTypes.string.isRequired
};

export default Fish;