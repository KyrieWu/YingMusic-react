import React from 'react';
import RoundItem from '@/components/RoundItem';
import SquareItem from '@/components/SquareItem';
import MVItem, { MVProps } from '@/components/MVItem';
import { useDispatch, useSelector } from 'react-redux';
import { timestampToTime } from '@/utils/utils';

const SearchNav = {
	1: '单曲',
	10: '专辑',
	100: '歌手',
	1000: '歌单',
	1004: 'MV',
};

const Search: React.FC = () => {
	const { keyword } = useSelector((state: RootType) => ({
		keyword: state.handleSearch.keyword,
	}));

	return <div>index</div>;
};

export default Search;
