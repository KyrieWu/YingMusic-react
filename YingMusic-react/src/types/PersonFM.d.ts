interface PerosnFMInfo {
    album: AlbumInfo;
    alg: string;
    alias: any[];
    artists: Artist[];
    audition?: any;
    bMusic: BMusic;
    commentThreadId: string;
    copyFrom: string;
    copyright: number;
    copyrightId: number;
    crbt?: any;
    dayPlays: number;
    disc: string;
    duration: number;
    fee: number;
    ftype: number;
    hMusic: BMusic;
    hearTime: number;
    hrMusic?: any;
    id: number;
    lMusic: BMusic;
    mMusic: BMusic;
    mark: number;
    mp3Url?: any;
    mvid: number;
    name: string;
    no: number;
    noCopyrightRcmd?: any;
    originCoverType: number;
    originSongSimpleData?: any;
    playedNum: number;
    popularity: number;
    position: number;
    privilege: Privilege;
    ringtone: string;
    rtUrl?: any;
    rtUrls: any[];
    rtype: number;
    rurl?: any;
    score: number;
    sign?: any;
    single: number;
    sqMusic?: any;
    starred: boolean;
    starredNum: number;
    status: number;
    transName?: any;
}

interface Privilege {
    chargeInfoList: ChargeInfoList[];
    cp: number;
    cs: boolean;
    dl: number;
    dlLevel: string;
    downloadMaxBrLevel: string;
    downloadMaxbr: number;
    fee: number;
    fl: number;
    flLevel: string;
    flag: number;
    freeTrialPrivilege: FreeTrialPrivilege;
    id: number;
    maxBrLevel: string;
    maxbr: number;
    payed: number;
    pl: number;
    plLevel: string;
    playMaxBrLevel: string;
    playMaxbr: number;
    preSell: boolean;
    rscl?: any;
    sp: number;
    st: number;
    subp: number;
    toast: boolean;
}

interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType?: any;
}

interface ChargeInfoList {
    chargeMessage?: any;
    chargeType: number;
    chargeUrl?: any;
    rate: number;
}

interface BMusic {
    bitrate: number;
    dfsId: number;
    extension: string;
    id: number;
    name?: any;
    playTime: number;
    size: number;
    sr: number;
    volumeDelta: number;
}

interface Artist {
    albumSize: number;
    alias: any[];
    briefDesc: string;
    id: number;
    img1v1Id: number;
    img1v1Url: string;
    musicSize: number;
    name: string;
    picId: number;
    picUrl: string;
    topicPerson: number;
    trans: string;
}
