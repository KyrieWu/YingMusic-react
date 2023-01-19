const store = {
    state: {
        keyword: ''
    },
    actions: {
        updateKeyword(newState: { keyword: string }, action: { type: string, val: string }) {
            newState.keyword = action.val
        }

    } as LooseObject,
    actionNames: {} as LooseObject,
}

let actionNames: LooseObject = {}

for (let key in store.actions) {
    actionNames[key] = key
}
store.actionNames = actionNames

export default store