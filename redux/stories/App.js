import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { connect, Provider } from '../src/redux'
import store from './store'

import './button.css';


export const App = () => {
  return (
		<Provider value={store}>
			<ChillFirst />
			<ChillSecond />
			<ChillThird />
			<ChillLast />
		</Provider>
  );
};

App.propTypes = {
  primary: PropTypes.bool,
};

App.defaultProps = {
  backgroundColor: null,
};

const ChillFirst = connect(
	(state) => ({ user: state.user})
)(({ user }) => {
	console.log(1)
	return (
		<div>
			<div>{user.name}--</div>
			ChillFirst
		</div>
	)
})

const ChillSecond = () => {
	console.log(2)
	return (
		<div>
			<UserModifier />
		</div>
	)
}

const ChillThird = () => {
	console.log(3)
	return (
		<div>
			ChillThird
		</div>
	)
}

const ChillLast = connect(
	(state) => ({ list: state.msgList })
)(({ list }) => {
	console.log(4)
	return (
		<div>
			ChillLast: { list.map(item => item) }
		</div>
	)
})

const UserModifier = connect(
	(state) => ({ user: state.user }),
	(dispatch) => ({
		updateUser: (payload) => dispatch({ type: "updateUser", payload })
	})
)(({ updateUser, user }) => {
	console.log(99)
	const onChange = (e) => {
		updateUser({
			name: e.target.value
		})
	}

	return (
		<div>
			<input
				onChange={onChange}
				value={user.name}
			/>
		</div>
	)
})



