import service from "@/utils/service"

// get Recommend the playlist
export function getRecPlayList(): Promise<RecPlayList> {
    return service({
        url: '/personalized?limit=10',
        method: 'get'
    })
}

// Get the recommended category playlist
export function getReccategoryPlayList(limit: number, cat: string, offset: number): Promise<ReccategoryPlayList> {
    return service({
        url: `/top/playlist?limit=${limit}&cat=${cat}&offset=${offset * limit}`,
        method: 'get'
    })
}