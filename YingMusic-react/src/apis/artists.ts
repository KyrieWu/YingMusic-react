import service from '@/utils/service';

export function getRecArtists(): Promise<Artists> {
	return service({
		url: '/top/artists?offset=0&limit=6',
		method: 'get',
	});
}

//get category artist
export function getCateArtist(type: number, area: number, initial: string, offset: number): Promise<Artists> {
	return service({
		url: `/artist/list?type=${type}&area=${area}&initial=${initial}&offset=${offset * 30}`,
		method: 'get'
	})
}

// get artist detail
export function getArtistDetail(id: any) {
	id = Number(id)
	return service({
		url: `/artist/detail?id=${id}`,
		method: 'get'
	})
}

// get artist hot song
export function getArtistHotSong(id: any) {
	id = Number(id)
	return service({
		url: `/artists?id=${id}`,
		method: 'get'
	})
}
//get simi artist
export function getSimitArtist(id: any) {
	id = Number(id)
	return service({
		url: `/simi/artist?id=${id}`,
		method: 'get'
	})
}
