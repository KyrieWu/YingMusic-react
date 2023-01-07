interface Search {
    code: number
    result: Result
}

interface Result {
    songs: SongInfo[],
    albums: AlbumInfo[],
    artists: ArtistsInfo[],
    playlists: any[],
    mvs: MVInfo[],
}