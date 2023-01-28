export function sortLyric(lyric: string) {
    let arr: any[];
    arr = lyric
        ?.trimEnd()
        .split(/[(\r\n)\r\n]+/)
        .map((item: any, i: any) => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 10);
            let lrc = item.slice(11, item.length);
            let time =
                parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            if (isNaN(Number(mill))) {
                mill = item.slice(7, 9);
                lrc = item.slice(10, item.length);
                time =
                    parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            }
            return { min, sec, mill, lrc, time };
        });

    arr?.forEach((item, i) => {
        if (i == arr.length - 1) {
            item.pre = 0;
        } else {
            item.pre = arr[i + 1].time;
        }
    });
    return arr;
}
