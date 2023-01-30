import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RoundItem from '@/components/RoundItem';
import SquareItem from '@/components/SquareItem';
import MVItem, { MVProps } from '@/components/MVItem';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { timestampToTime } from '@/utils/utils';
import styles from './style.module.scss';
import { search } from '@/apis';

const SearchNav = [
	[1, '单曲'],
	[10, '专辑'],
	[100, '歌手'],
	[1000, '歌单'],
	[1004, 'MV'],
];

const Search: React.FC = () => {
	const { keyword } = useSelector((state: RootType) => ({
		keyword: state.handleSearch.keyword,
	}));

	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [inputFocus, setInputFocus] = useState<boolean>(false);
	const [_keyword, setKeyword] = useState<string>('');
	const [searchType, setSearchType] = useState<number>(1);
	const [canSearch, setCanSearch] = useState<boolean>(false);
	const [songList, setSongList] = useState<SongInfo[]>([]);
	const [albumList, setAlbumList] = useState<SquareItemProps[]>([]);
	const [artistList, setArtistList] = useState<ArtistsInfo[]>([]);
	const [playLists, setPlayLists] = useState<SquareItemProps[]>([]);
	const [mvList, setMvList] = useState<MVProps[]>([]);

	useEffect(() => {
		setKeyword(keyword);
		search(keyword, 1).then(res => {
			setSongList(res.result.songs);
		});
	}, []);

	useEffect(() => {
		searchResult();
	}, [searchType]);

	const searchResult = async () => {
		if (_keyword.trim()) {
			let res = await search(_keyword, searchType);
			if (res.code === 200) {
				if (searchType == 1) {
					setSongList(res.result.songs);
				} else if (searchType == 10) {
					setAlbumList(formatAlbumList(res.result.albums));
				} else if (searchType == 100) {
					setArtistList(res.result.artists);
				} else if (searchType == 1000) {
					setPlayLists(formatPlaylist(res.result.playlists));
				} else if (searchType == 1004) {
					setMvList(formatMVlist(res.result.mvs));
				}
			}
		}
	};

	const formatAlbumList = (albums: AlbumInfo[]): SquareItemProps[] => {
		let arr: SquareItemProps[] = [];
		albums.forEach((item: any) => {
			arr.push({
				id: item.id,
				type: 'album',
				picUrl: item.picUrl,
				name: item.name,
				artistId: item.artist.id,
				artistName: item.artist.name,
				routerPath: '/albumDetail',
				publishTime: item.publishTime,
			});
		});
		return arr;
	};

	const formatPlaylist = (playlists: any[]): SquareItemProps[] => {
		let arr: SquareItemProps[] = [];
		playlists.forEach((item: any) => {
			arr.push({
				id: item.id,
				type: 'songlist',
				name: item.name,
				picUrl: item.coverImgUrl,
				routerPath: '/songlistDetail',
			});
		});

		return arr;
	};

	const formatMVlist = (mvs: MVInfo[]): MVProps[] => {
		let arr: MVProps[] = [];
		mvs.forEach((item: any) => {
			arr.push({
				id: item.id,
				name: item.name,
				picUrl: item.cover,
				artistId: item.artistId,
				artistName: item.artistName,
				playCount: item.playCount,
			});
		});
		return arr;
	};

	const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.currentTarget.value);
		dispatch({ type: 'updateKeyword', val: e.currentTarget.value });
	};

	const toSearch = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			searchResult();
			e.preventDefault();
		}
	};
	const playSong = (item: SongInfo) => {
		dispatch({ type: 'playSong', val: item });
	};

	const addToPlaylist = (song: SongInfo) => {
		dispatch({ type: 'addToPlayList', val: song });
	};

	return (
		<div className={styles.search_container}>
			<div className={styles.search_top}>
				<div className={styles.search_top_bg}></div>
				<div className={`${styles.input} ${inputFocus ? styles.active : ''}`}>
					<input
						type="text"
						value={_keyword}
						onChange={e => changeKeyword(e)}
						onFocus={() => setInputFocus(true)}
						onBlur={() => setInputFocus(false)}
						onKeyDown={e => toSearch(e)}
					/>
				</div>
				<div className={styles.icon}>
					<SearchOutlined className={styles.search_icon} onClick={() => searchResult()} />
				</div>
			</div>
			<div className={styles.search_content}>
				<div className={styles.nav}>
					{SearchNav.map(item => {
						return (
							<span
								className={`${styles.nav_item} ${searchType == item[0] ? styles.active : ''}`}
								key={item[0]}
								onClick={() => setSearchType(item[0] as number)}
							>
								{item[1]}
							</span>
						);
					})}
				</div>
				<div className={styles.content}>
					{searchType == 1 && (
						<div className={styles.song}>
							<div className={styles.title}>
								共搜索到&nbsp;<span style={{ color: '#c20c0c' }}>{songList?.length}</span>&nbsp;首歌
							</div>
							<div className={styles.mod_songlist}>
								<ul className={styles.songlist__header}>
									<li className={styles.songlist__header_empty}></li>
									<li className={styles.songlist__header_name}>{t('songItem.songName')}</li>
									<li className={styles.songlist__header_author}>{t('songItem.singer')}</li>
									<li className={styles.songlist__header_album}>{t('songItem.album')}</li>
									<li className={styles.songlist__header_time}>{t('songItem.songTime')}</li>
								</ul>
								<ul className={styles.songlist__list}>
									{songList.map((item, index) => {
										return (
											<li key={item.id}>
												<div className={styles.songlist__item}>
													<div className={styles.songlist__number}>{index + 1}</div>
													<div className={styles.songlist__play}>
														<a
															className={`${styles.list_menu__item} ${styles.list_menu__play}`}
															title={`${t('songItem.play')}`}
															onClick={() => playSong(item)}
														>
															<i className={styles.list_menu__icon_play}></i>
														</a>
													</div>
													<div className={styles.songlist__songname}>
														<span className={styles.songlist__songname_txt}>{item.name}</span>
													</div>
													<div className={styles.songlist__artist}>
														<Link
															to={`/artistDetail/ ${item.ar[0].id}`}
															className={styles.playlist__author}
															title={item.ar[0].name}
														>
															{item.ar[0].name}
														</Link>
													</div>
													<div className={styles.songlist__album}>
														<Link to={`/albumDetail/${item.al.id}`} title={item.al.name}>
															{item.al.name}
														</Link>
													</div>
													<div className={styles.songlist__time}>{timestampToTime(item.dt)}</div>
													<div className={styles.songlist__add}>
														<a
															className={`${styles.list_menu__item} ${styles.list_menu__add}`}
															title={`${t('songItem.add')}`}
															onClick={() => addToPlaylist(item)}
														>
															<i className={styles.list_menu__icon_add}></i>
														</a>
													</div>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					)}
					{searchType == 10 && (
						<div className={styles.album}>
							<div className={styles.title}>
								共搜索到&nbsp;<span style={{ color: '#c20c0c' }}>{albumList?.length}</span>&nbsp;张专辑
							</div>
							<SquareItem squareItems={albumList}></SquareItem>
						</div>
					)}
					{searchType == 100 && (
						<div className={styles.artist}>
							<div className={styles.title}>
								共搜索到&nbsp;<span style={{ color: '#c20c0c' }}>{artistList?.length}</span>&nbsp;位歌手
							</div>
							<RoundItem artistsInfos={artistList}></RoundItem>
						</div>
					)}
					{searchType == 1000 && (
						<div className={styles.playlist}>
							<div className={styles.title}>
								共搜索到&nbsp;<span style={{ color: '#c20c0c' }}>{playLists?.length}</span>&nbsp;个歌单
							</div>
							<SquareItem squareItems={playLists}></SquareItem>
						</div>
					)}
					{searchType == 1004 && (
						<div className={styles.mv}>
							<div className={styles.title}>
								共搜索到&nbsp;<span style={{ color: '#c20c0c' }}>{mvList?.length}</span>&nbsp;部MV
							</div>
							<MVItem mvList={mvList}></MVItem>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
