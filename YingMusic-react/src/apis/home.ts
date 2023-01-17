import service from '@/utils/service';

export function getBanner(): Promise<Banners> {
	return service({
		url: '/banner?type=0',
		method: 'GET',
	});
}
