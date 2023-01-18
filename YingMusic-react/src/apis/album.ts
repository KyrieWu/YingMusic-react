import service from '@/utils/service';

export function getNewAlbum(area: string, limit: number, offset: number): Promise<Album> {
	return service({
		url: `/album/new?area=${area}&limit=${limit}&offset=${offset * limit}`,
		method: 'get',
	});
}
// get altum detail
export function getAltumDetail(id: any) {
	id = Number(id)
	return service({
		url: `/album?id=${id}`,
		method: 'get'
	})
}

// get art album
export function getArtAlbum(id: any, limit: number, offset: number) {
	id = Number(id)
	return service({
		url: `/artist/album?id=${id}&limit=${limit}&offset=${offset * limit}`,
		method: 'get'
	})
}
