import service from "@/utils/service"

// get the lyrics
export function getLyric(id: any): Promise<Lyric> {
    id = Number(id)
    return service({
        url: `/lyric?id=${id}`,
        method: 'get'
    })
}