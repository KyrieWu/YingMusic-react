import React, { useEffect, useState } from 'react';
import loading from '@/assets/loading.gif';

interface IImagProps {
	name: string;
	/**
	 * 图片正常显示的地址
	 */
	src: string;
}

function Img(props: IImagProps) {
	// 图片地址
	const [src, setSrc] = useState(loading as string);

	useEffect(() => {
		setSrc(props.src);
	}, [props.src]);
	/**
	 * 图片加载完成
	 */
	const handleOnLoad = () => {
		// 创建一个img标签
		const imgDom = new Image();
		imgDom.src = props.src;
		// 图片加载完成使用正常的图片
		imgDom.onload = function () {
			setSrc(props.src);
		};
	};

	return <img src={src} alt={props.name} onLoad={() => handleOnLoad()} loading="lazy" />;
}

export default Img;
