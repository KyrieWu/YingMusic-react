interface Login {
    account: Account;
    bindings: any[];
    code: number;
    cookie: string;
    loginType: number;
    profile: Profile;
    token: string;
}

interface Profile {
    accountStatus: number;
    authStatus: number;
    authority: number;
    avatarDetail?: any;
    avatarImgId: number;
    avatarImgIdStr: string;
    avatarImgId_str: string;
    avatarUrl: string;
    backgroundImgId: number;
    backgroundImgIdStr: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    eventCount: number;
    expertTags?: any;
    experts: Experts;
    followed: boolean;
    followeds: number;
    follows: number;
    gender: number;
    mutual: boolean;
    nickname: string;
    playlistBeSubscribedCount: number;
    playlistCount: number;
    province: number;
    remarkName?: any;
    signature: string;
    userId: number;
    userType: number;
    vipType: number;
}

interface Experts {
}
interface Account {
    anonimousUser: boolean;
    ban: number;
    baoyueVersion: number;
    createTime: number;
    donateVersion: number;
    id: number;
    salt: string;
    status: number;
    tokenVersion: number;
    type: number;
    uninitialized: boolean;
    userName: string;
    vipType: number;
    viptypeVersion: number;
    whitelistAuthority: number;
}