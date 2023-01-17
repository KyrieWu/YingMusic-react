const store = {
	state: {
		playListCat: '',
	},
	actions: {
		updatePlayListCat(newState: { playListCat: string }, action: { type: string; val: string }) {
			newState.playListCat = action.val;
		},
	} as LooseObject,
	actionNames: {} as LooseObject,
};

const actionNames: LooseObject = {};

for (const key in store.actions) {
	actionNames[key] = key;
}
store.actionNames = actionNames;
export default store;
