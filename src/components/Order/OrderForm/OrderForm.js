import React from "react";
import "./OrderForm.module.scss";

export default class OrderForm extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidUpdate() {
		if (this.props.location.state.submitMe === true) {
			this.refs.orderForm.submit();
		}
	}

	render() {
		return (
			<section>
				<form ref="orderForm" name="order" method="POST" netlify-honeypot="bot-field" data-netlify="true">
					<p className="hidden">
						<label>
							Don’t fill this out if you're human: <input name="bot-field" />
						</label>
					</p>
					<input type="hidden" name="form-name" value="order" />
					<div className="field">
						<label className="label">First Name: </label>
						<div className="control">
							<input className="input" type="text" id="firstName" name="firstName" required />
						</div>
					</div>
					<div className="field">
						<label className="label">Last Name: </label>
						<div className="control">
							<input className="input" type="text" id="lastName" name="lastName" required />
						</div>
					</div>
					<div className="field">
						<label className="label">Email: </label>
						<div className="control">
							<input
								className="input"
								type="email"
								id="email"
								name="email"
								title="Must be a valid email format."
								pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
								size="30"
								placeholder="joe@gmail.com"
								required
							/>
						</div>
						<p className="help">Must be a valid email format</p>
					</div>
					<div className="field">
						<label className="label">Phone: </label>
						<div className="control">
							<input className="input" type="tel" id="phone" name="phone" title="10 digit phone number." placeholder="3124456745" />
						</div>
						<p className="help">Without additional characters</p>
					</div>
					<div className="field">
						<label className="label">Comments: </label>
						<div className="control">
							<textarea className="textarea" name="comments" id="comments" />
						</div>
					</div>
					<div data-netlify-recaptcha />
					{/* <button type="submit" className="button">
						Submit
					</button> */}
				</form>
			</section>
		);
	}
}
