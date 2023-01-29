import service from "@/utils/service"

// get the lyrics
export function getLyric(id: any): Promise<Lyric> {
    id = Number(id)
    return service({
        url: `/lyric?id=${id}`,
        method: 'get'
    })
}

// chunk song
export function checkMusic(id: any): Promise<CheckMusic> {
    id = Number(id)
    return service({
        url: `/check/music?id=${id}`,
        method: 'get'
    })
}