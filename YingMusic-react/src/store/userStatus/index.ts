const store = {
    state: {
        isLogin: false
    },
    actions: {
        updateIsLogin(newState: { isLogin: boolean }, action: { type: string; val: any }) {
            newState.isLogin = action.val
        }
    } as LooseObject,
    actionsNames: {} as LooseObject
}

const actionNames: LooseObject = {}


for (const key in store.actions) {
    actionNames[key] = key;
}
store.actionsNames = actionNames

export default store