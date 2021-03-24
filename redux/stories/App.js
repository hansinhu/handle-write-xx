import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { createNewState } from '../src/createNewState'

import './button.css';

const appContext = createContext(null)

const connext = (component) => {
	const Wrapper = (props) => {
		const { appState, setAppState } = useContext(appContext)
	
		const dispatch = (action) => {
			setAppState(createNewState(appState, action))
		}
	
		return React.createElement(
			component,
			{ dispatch, state: appState },
			props.children
		)
	}

	return Wrapper;
}

export const App = () => {
	const [appState, setAppState] = useState({
		user: { name: 'Frank', age: 18 }
	})

	const contextValue = { appState, setAppState }


  return (
		<appContext.Provider value={contextValue}>
			<ChillFirst />
			<ChillSecond />
			<ChillThird />
		</appContext.Provider>
    
  );
};

App.propTypes = {
  primary: PropTypes.bool,
};

App.defaultProps = {
  backgroundColor: null,
};

const ChillFirst = connext(({ state }) => {
	return (
		<div>
			<div>{state.user.name}--</div>
			ChillFirst
		</div>
	)
})

const ChillSecond = () => {
	return (
		<div>
			<UserModifier />
		</div>
	)
}

const ChillThird = () => {
	return (
		<div>
			ChillThird
		</div>
	)
}

const UserModifier = connext(({ dispatch, state }) => {

	const onChange = (e) => {
		dispatch({
			type: 'updateUser',
			payload: {
				name: e.target.value
			}
		})
	}

	return (
		<div>
			<input
				onChange={onChange}
				value={state.user.name}
			/>
		</div>
	)
})



