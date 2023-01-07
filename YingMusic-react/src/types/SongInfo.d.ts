interface SongData {
    code: number
    privileges: []
    songs: SongInfo[]
}

interface SongInfo {
    a: null
    al: AlInfo
    alia: []
    ar: ArInfo[]
    awardTags: null
    cd: string
    cf: string
    copyright: number
    cp: number
    crbt: null
    djId: number
    dt: number
    entertainmentTags: null
    fee: number
    ftype: number
    h: object
    hr: object
    id: number
    l: object
    m: object
    mark: 536870912
    mst: number
    mv: number
    name: string
    no: number
    noCopyrightRcmd: null
    originCoverType: number
    originSongSimpleData: null
    pop: number
    pst: number
    publishTime: number
    resourceState: true
    rt: string
    rtUrl: null
    rtUrls: []
    rtype: number
    rurl: null
    s_id: number
    single: number
    songJumpInfo: null
    sq: object
    st: number
    t: number
    tagPicList: null
    tns?: string[]
    v: number
    version: number
}

interface ArInfo {
    alias: []
    id: number
    name: string
    tns: []
}

interface AlInfo {
    id: number
    name: string
    pic: number
    picUrl: string
    pic_str: string
    tns?: string[]
}

interface CheckMusic {
    success: boolean,
    message: string
}