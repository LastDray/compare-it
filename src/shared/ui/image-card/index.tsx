import { FC } from 'react';
import './image-card.css';
import cx from 'clsx';

type ImageCardProps = {
	src: string;
	name: string;
	index?: number;
	handleClick?: (index: number) => void;
	className?: string;
};

const ImageCard: FC<ImageCardProps> = ({
	src,
	name,
	index = 0,
	handleClick = () => {},
	className,
}) => {
	console.log(`index: ${index}`);
	return (
		<div
			className={cx('card', className)}
			onClick={() => handleClick(index)}
		>
			<img src={src} alt={name} />
			<p>{name}</p>
		</div>
	);
};

export default ImageCard;
