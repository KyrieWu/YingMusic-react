import { getLyric } from "@/apis"
import { sortLyric } from '@/utils/sortLyric';

const store = {
    state: {
        playList: [] as SongInfo[],
        playIndex: -1,
        currentTime: 0,
        duration: 0,
        showPlayerBar: false,
        lyric: [] as any[],
        volumeRange: 0
    },
    actions: {
        playSong(newState: {
            playList: SongInfo[],
            playIndex: number,
            showPlayerBar: boolean,
        }, action: {
            type: string, val: SongInfo
        }) {

            if (newState.playList.length > 0) {
                newState.playList.forEach((item, index) => {
                    if (item.id == action.val.id) {
                        newState.playIndex = index
                        newState.showPlayerBar = true
                    }
                })
            } else {
                newState.playList.unshift(action.val)
                newState.playIndex = 0
                newState.showPlayerBar = true
            }
        },
        getLyric(newState: { lyric: any[] }, action: {
            type: string, val: string
        }) {
            newState.lyric = sortLyric(action.val)
        },
        updatePlayIndex(newState: { playIndex: number }, action: { type: string, val: number }) {
            newState.playIndex = action.val
        },
        updateCurrentTime(newState: { currentTime: number }, action: { type: string, val: number }) {
            newState.currentTime = action.val
        },
        updateDuration(newState: { duration: number }, action: { type: string, val: number }) {
            newState.duration = action.val
        },
        showPlayer(newState: { showPlayerBar: boolean }, action: { type: string, val: boolean }) {
            newState.showPlayerBar = action.val
        },
        updateVolumeRange(newState: { volumeRange: number }, action: { type: string, val: number }) {
            newState.volumeRange = action.val
        },
        updatePlayList(newState: {
            playList: SongInfo[],
            playIndex: number,
            showPlayerBar: boolean,
        }, action: { type: string, val: SongInfo[] }) {
            newState.playList = action.val
            newState.playIndex = 0
            newState.showPlayerBar = true
        },
        deletePlayList(newState: { playList: SongInfo[] }) {
            newState.playList = []
        },
        deleteSongFormPlayList(newState: { playList: SongInfo[], playIndex: number }, action: { type: string, val: SongInfo }) {
            if (newState.playList.length > 0) {
                newState.playList.forEach((item, index) => {
                    if (item.id == action.val.id) {
                        if (index == newState.playIndex) {
                            if (index == newState.playList.length - 1) {
                                newState.playIndex = index - 1
                            } else {
                                newState.playIndex = index
                            }
                        }

                        newState.playList.splice(index, 1)
                    }
                })
            }
        },
        addToPlayList(newState: {
            playList: SongInfo[],
            playIndex: number,
            showPlayerBar: boolean,
        }, action: { type: string, val: SongInfo }) {
            if (!newState.playList.includes(action.val)) {
                let list: SongInfo[] = []
                list = newState.playList

                list.unshift(action.val)
                newState.playList = list
                newState.playIndex = newState.playIndex + 1
                newState.showPlayerBar = true
            }
        },

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