interface MVData {
    code: number
    data: MVInfo[]
}

interface MVInfo {
    artistId: number
    artistName: string
    artists: string[]
    briefDesc: string
    cover: string
    desc: string
    duration: number
    id: number
    mark: number
    name: string
    playCount: number
    subed: boolean,
    publishTime: number
}


interface ArtistMvInfo {
    artist: Artist;
    artistName: string;
    duration: number;
    id: number;
    imgurl: string;
    imgurl16v9: string;
    name: string;
    playCount: number;
    publishTime: string;
    status: number;
    subed: boolean;
}

interface Artist {
    albumSize: number;
    alias: any[];
    briefDesc: string;
    id: number;
    img1v1Id: number;
    img1v1Id_str: string;
    img1v1Url: string;
    musicSize: number;
    name: string;
    picId: number;
    picUrl: string;
    topicPerson: number;
    trans: string;
}