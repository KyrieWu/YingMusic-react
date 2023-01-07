interface Artists {
    artists: ArtistsInfo[],
    code: number,
    more: boolean
}

interface ArtistsInfo {
    accountId: number,
    albumSize: number,
    alg: null,
    alias: string[],
    briefDesc: string,
    fansCount: number,
    followed: boolean,
    id: number,
    identifyTag: null,
    img1v1Id: number,
    img1v1Id_str: string,
    img1v1Url: string,
    isSubed: boolean,
    musicSize: number,
    mvSize: number,
    name: string,
    picId: number,
    picId_str: string,
    picUrl: string,
    publishTime: null,
    showPrivateMsg: string,
    topicPerson: number,
    trans: string,
    transNames: null,
    cover?: string
}