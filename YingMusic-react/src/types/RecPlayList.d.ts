interface RecPlayList {
    category: number,
    code: number,
    hasTaste: boolean,
    result: PlayListInfo[]
}

interface PlayListInfo {
    alg: string,
    canDislike: boolean,
    copywriter: string,
    highQuality: boolean,
    id: number,
    name: string,
    picUrl: string,
    playCount: number,
    trackCount: number,
    trackNumberUpdateTime: number,
    type: number
}

interface ReccategoryPlayList {
    cat: string;
    code: number;
    more: boolean;
    playlists: ReccategoryPlaylistInfo[];
    total: number;
}

interface ReccategoryPlaylistInfo {
    adType: number;
    alg: string;
    anonimous: boolean;
    cloudTrackCount: number;
    commentCount: number;
    commentThreadId: string;
    coverImgId: number;
    coverImgId_str: string;
    coverImgUrl: string;
    coverStatus: number;
    createTime: number;
    creator: Creator;
    description: string;
    highQuality: boolean;
    id: number;
    name: string;
    newImported: boolean;
    ordered: boolean;
    playCount: number;
    privacy: number;
    recommendInfo?: any;
    shareCount: number;
    specialType: number;
    status: number;
    subscribed: boolean;
    subscribedCount: number;
    subscribers: any[];
    totalDuration: number;
    trackCount: number;
    trackNumberUpdateTime: number;
    trackUpdateTime: number;
    tracks?: any;
    updateTime: number;
    userId: number;
    tags?: []
}

interface Creator {
}