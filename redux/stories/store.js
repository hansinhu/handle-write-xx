import { createStore } from '../src/redux'

const store = createStore({
  reducer: (state, { type, payload }) => {
		console.log('--type--', type)
    if (type === "updateUser") {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      };
    } else {
      return state;
    }
  },
  preloadedState: {
		user: { name: "frank", age: 18 },
		msgList: ['hhhaha', 'hhhhhe']
	}
});

export default store
