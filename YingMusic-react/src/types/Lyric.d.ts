interface Lyric {
    code: number;
    klyric: Klyric;
    lrc: Klyric;
    lyricUser: LyricUser;
    qfy: boolean;
    romalrc: Klyric;
    sfy: boolean;
    sgc: boolean;
    tlyric: Klyric;
}

interface LyricUser {
    id: number;
    status: number;
    demand: number;
    userid: number;
    nickname: string;
    uptime: number;
}

interface Klyric {
    version: number;
    lyric: string;
}