import service from '@/utils/service';

export function getBanner(): Promise<Banners> {
	return service({
		url: '/banner?type=0',
		method: 'GET',
	});
}

// get daily recommend songs
export function getDailyRecommendSongs() {
	return service({
		url: `/recommend/songs`,
		method: 'get'
	})
}

//get personal FM
export function getPersonalFm() {
	return service({
		url: `/personal_fm`,
		method: 'get'
	})
}