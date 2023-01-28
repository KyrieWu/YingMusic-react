import { getLyric } from "@/apis"

const store = {
    state: {
        playList: [] as SongInfo[],
        playIndex: -1,
        currentTime: 0,
        duration: 0,
        showPlayerBar: false,
        lyricList: {}
    },
    actions: {
        playSong(newState: {
            playList: SongInfo[],
            playIndex: number,
            showPlayerBar: boolean,
        }, action: {
            type: string, val: SongInfo
        }) {

            if (newState.playList.length > 0 && newState.playList.includes(action.val)) {
                let index = newState.playList.indexOf(action.val)
                newState.playIndex = index
            } else {
                let list: SongInfo[] = []
                if (newState.playList.length > 0) {
                    list = newState.playList
                }

                list.unshift(action.val)
                newState.playList = list
                newState.playIndex = 0
                newState.showPlayerBar = true
            }
        },
        getLyric(newState: { lyricList: {} }, action: {
            type: string, val: any
        }) {
            newState.lyricList = action.val
        }
    } as LooseObject,
    asyncActions: {
        asyncGetLyric(dispatch: Function, id: number): void {
            getLyric(id).then(res => {
                dispatch({ type: "getLyric", val: res.lrc });
            });

        }
    },
    actionNames: {} as LooseObject
}

const actionNames: LooseObject = {}

for (const key in store.actions) {
    actionNames[key] = key
}
store.actionNames = actionNames

export default store