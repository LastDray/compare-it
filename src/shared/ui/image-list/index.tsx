import { FC } from 'react';
import './image-list.css';

type ImageListProps = {
	resizedImages: string[];
	imageNames: string[];
};

const ImageList: FC<ImageListProps> = ({ resizedImages, imageNames }) => {
	return (
		<div className='imageList'>
			{resizedImages?.map((image, index) => (
				<div className='imageContainer' key={index}>
					<img
						src={image}
						alt={imageNames[index] ?? 'unknown'}
						className='image'
					/>
					<p className='signature'>
						{imageNames[index] ?? 'unknown'}
					</p>
				</div>
			))}
		</div>
	);
};

export default ImageList;
