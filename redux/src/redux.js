import React, { useContext, createContext, useEffect, useState } from 'react'

const createStore = ({ reducer, preloadedState }) => {
  store.state = preloadedState;
  store.reducer = reducer;
  return store;
};

const store = {
	state: null,
	reducer: null,
	setState(newState) {
		store.state = newState
		store.listeners.map(fn => fn(store.state))
	},
	listeners: [],
	subscribe(fn) {
		store.listeners.push(fn)
		return () => {
			const index = store.listeners.indexOf(fn);
			store.listeners.splice(index, 1);
		}
	}
}

const appContext = createContext(null)

const Provider = (props) => {
	const { store, children, ...rest } = props;
	return (
		<appContext.Provider value={store} {...rest}>
			{children}
		</appContext.Provider>
	)
}

const changed = (oldState, newState) => {
	let changed = false
	for (let key in oldState) {
		if (oldState[key] !== newState[key]) {
			changed = true;
		}
	}
	return changed
}

const connect = (selector, dispatchSelector) => (component) => {
	const Wrapper = (props) => {
		const { state, setState, subscribe } = useContext(appContext)
		const [, update] = useState({})
		const selectedState = selector ? selector(state) : { state }

		useEffect(() => {
			const unsubscribe = subscribe((newState) => {
				const newSelectedState = selector ? selector(newState) : { state: newState }
				if (changed(selectedState, newSelectedState)) {
					update({})
				}
			})
			return unsubscribe;
		}, [selector, state])
	
		const dispatch = (action) => {
			setState(store.reducer(state, action));
		}

		const dispatchers = dispatchSelector ? dispatchSelector(dispatch) : { dispatch }
	
		return React.createElement(
			component,
			{ ...dispatchers, ...selectedState },
			props.children
		)
	}

	return Wrapper;
}

export { connect, createStore, Provider }
