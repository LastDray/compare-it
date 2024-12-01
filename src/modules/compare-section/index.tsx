import { FC, useEffect, useState } from 'react';
import ImageList from '../../shared/ui/image-list';
import { ScoreType } from '../../shared/types/score';
import ImageCard from '../../shared/ui/image-card';
import './compare-section.css';

type CompareSectionProps = {
	imageNames: string[];
	resizedImages: string[];
	setScoreList: React.Dispatch<React.SetStateAction<ScoreType[] | undefined>>;
	matches: number[][];
	setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
	setIsFinish: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompareSection: FC<CompareSectionProps> = ({
	imageNames,
	resizedImages,
	setScoreList,
	matches,
	setIsReady,
	setIsFinish,
}) => {
	const [isEnd, setIsEnd] = useState(false);
	const handleClick = (index: number) => {
		setScoreList(prev => {
			if (prev) {
				const prevItem = prev[index];
				prevItem.score = prevItem.score + 1;
				return [
					...prev.slice(0, index),
					prevItem,
					...prev.slice(index + 1),
				];
			} else {
				return prev;
			}
		});

		setCurrentMatch(prev => {
			if (prev + 1 < matches.length) {
				return prev + 1;
			} else {
				setIsEnd(true);
				return 0;
			}
		});
	};
	const [currentMatch, setCurrentMatch] = useState(0);

	useEffect(() => {
		if (isEnd) {
			setIsReady(false);
			setIsFinish(true);
		}
	}, [isEnd]);

	return (
		<div>
			<h2 className='roundHeader'>{`Раунд ${currentMatch + 1} из ${matches.length}`}</h2>
			<div className='compareGrid'>
				{matches[currentMatch].map(index => {
					return (
						<ImageCard
							key={`${index} ${currentMatch}`}
							src={resizedImages[index]}
							name={imageNames[index]}
							index={index}
							handleClick={handleClick}
							className='compareCard'
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CompareSection;
