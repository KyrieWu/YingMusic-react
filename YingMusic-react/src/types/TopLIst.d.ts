interface TopListData {
    artistToplist: object,
    code: number,
    list: TopListInfo[]
}

interface TopListInfo {
    ToplistType: string
    adType: number
    anonimous: boolean
    artists: null
    backgroundCoverId: number
    backgroundCoverUrl: string
    cloudTrackCount: number
    commentThreadId: string
    coverImgId: number
    coverImgId_str: string
    coverImgUrl: string
    createTime: number
    creator: null
    description: string
    englishTitle: null
    highQuality: boolean
    id: number
    name: string
    newImported: false
    opRecommend: false
    ordered: true
    playCount: number
    privacy: number
    recommendInfo: null
    specialType: number
    status: number
    subscribed: null
    subscribedCount: number
    subscribers: []
    tags: []
    titleImage: number
    titleImageUrl: null
    totalDuration: number
    trackCount: number
    trackNumberUpdateTime: number
    trackUpdateTime: number
    tracks: null
    updateFrequency: string
    updateTime: number
    userId: number
}