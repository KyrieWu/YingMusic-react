import handlePlayer from './index'

const defaultState = {
    ...handlePlayer.state
}

const reducer = (state = defaultState, action: { type: string, val: any }) => {
    const newState = JSON.parse(JSON.stringify(state))

    for (const key in handlePlayer.actionNames) {
        if (action.type === handlePlayer.actionNames[key]) {
            handlePlayer.actions[handlePlayer.actionNames[key]](newState, action)
        }
    }
    return newState
}

export default reducer