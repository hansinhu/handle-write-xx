const createNewState = (state, { type, payload }) => {
	if (type === 'updateUser') {
		return {
			...state,
			user: {
				...state.user,
				...payload,
			}
		}
	} else {
		throw new Error('actionType 不存在')
	}
}

export { createNewState }
