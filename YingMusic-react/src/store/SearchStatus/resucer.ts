import handleSearch from './index'

const defaultState = {
    ...handleSearch.state
}

const reducer = (state = defaultState, action: { type: string, val: string }) => {
    const newState = JSON.parse(JSON.stringify(state));

    for (const key in handleSearch.actionNames) {
        if (action.type === handleSearch.actionNames[key]) {
            handleSearch.actions[handleSearch.actionNames[key]](newState, action)
        }
    }
    return newState
}

export default reducer

