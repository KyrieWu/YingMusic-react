interface Songlist {
    code: number;
    fromUserCount: number;
    fromUsers?: any;
    playlist: ReccategoryPlaylistInfo;
    privileges: Privilege[];
    relatedVideos?: any;
    resEntrance?: any;
    sharedPrivilege?: any;
    songFromUsers?: any;
    urls?: any;
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
    paidBigBang: boolean;
    payed: number;
    pc?: any;
    pl: number;
    plLevel: string;
    playMaxBrLevel: string;
    playMaxbr: number;
    preSell: boolean;
    realPayed: number;
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
