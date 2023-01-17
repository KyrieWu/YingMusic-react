import service from '@/utils/service';

export function getTopList(): Promise<TopListData> {
	return service({
		url: '/toplist',
		method: 'get',
	});
}
