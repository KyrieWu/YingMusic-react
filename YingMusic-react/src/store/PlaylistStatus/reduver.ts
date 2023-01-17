import handlePlayList from './index';

const defaultState = {
	...handlePlayList.state,
};

const reducer = (state = defaultState, action: { type: string; val: string }) => {
	const newState = JSON.parse(JSON.stringify(state));

	for (const key in handlePlayList.actionNames) {
		if (action.type === handlePlayList.actionNames[key]) {
			handlePlayList.actions[handlePlayList.actionNames[key]](newState, action);
		}
	}
	return newState;
};
export default reducer;
