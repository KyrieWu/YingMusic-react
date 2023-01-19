import handlerUser from './index'

const defaultState = {
    ...handlerUser.state
}

const reducer = (state = defaultState, action: { type: string; val: any }) => {
    const newState = JSON.parse(JSON.stringify(state));

    for (const key in handlerUser.actionsNames) {
        if (action.type === handlerUser.actionsNames[key]) {
            handlerUser.actions[handlerUser.actionsNames[key]](newState, action)
        }
    }
    return newState
}
export default reducer;