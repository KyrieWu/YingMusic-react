import service from "@/utils/service"

// search
// type : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
export function search(keyWord: string, type: number): Promise<Search> {
    return service({
        url: `/cloudsearch?keywords=${keyWord}&limit=20&type=${type}`,
        method: 'get'
    })
}