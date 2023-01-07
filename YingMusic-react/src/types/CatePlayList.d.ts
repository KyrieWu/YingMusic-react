interface CatePlayLists {
    cat: string,
    code: number,
    more: boolean,
    playlists: CatePlayListInfo[],
    total: number,
}

interface CatePlayListInfo {
    adType: number
    alg: string
    anonimous: boolean
    cloudTrackCount: number
    commentCount: number
    commentThreadId: string
    coverImgId: number
    coverImgUrl: string
    coverStatus: number
    createTime: number
    creator: object
    description: string
    highQuality: boolean
    id: number
    name: string
    newImported: boolean
    ordered: boolean
    playCount: number
    privacy: number
    recommendInfo?: string
    shareCount: number
    specialType: number
    status: number
    subscribed: boolean
    subscribedCount: number
    subscribers: []
    tags: []
    totalDuration: number
    trackCount: number
    trackNumberUpdateTime: number
    trackUpdateTime: number
    tracks: []
    updateTime: number
    userId: number
}