export function timestampToTime(timestamp: any) {
    timestamp = Number(timestamp)
    const d = new Date(timestamp)
    const m = addZero(d.getMinutes())
    const s = addZero(d.getSeconds())

    function addZero(value: number) {
        return value < 10 ? ('0' + value) : value
    }

    return `${m}:${s}`
}

export function uptateTime(endtime: any, startTime: any) {
    endtime = Number(endtime)
    startTime = Number(startTime)

    const d1 = new Date(startTime)
    const d2 = new Date(endtime)

    let m = d1.getMinutes()
    let s = d1.getSeconds()

    function addZero(value: number) {
        return value < 10 ? ('0' + value) : value
    }

    s++
    if (s >= 60) {
        m += 1
        s = 0
    }
    if (m >= d2.getMinutes() && s >= d2.getSeconds()) {
        m = d2.getMinutes()
        s = d2.getSeconds()
    }


    return `${addZero(m)}:${addZero(s)}`

}


export function timestampToDate(timestamp: any) {
    timestamp = Number(timestamp)
    const date = new Date(timestamp)
    const y = date.getFullYear()
    const m = addZero(date.getMonth())
    const d = addZero(date.getDate())

    function addZero(value: number) {
        return value < 10 ? ('0' + value) : value
    }

    return `${y}-${m}-${d}`
}