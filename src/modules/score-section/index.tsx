import { FC } from 'react';
import { ScoreType } from '../../shared/types/score';
import ImageCard from '../../shared/ui/image-card';
import './score-section.css';

type ScoreSectionProps = {
	imageNames: string[];
	resizedImages: string[];
	scoreList: ScoreType[];
};

const ScoreSection: FC<ScoreSectionProps> = ({
	imageNames,
	resizedImages,
	scoreList,
}) => {
	scoreList.sort((a, b) => b.score - a.score);

	return (
		<div className='rootGrid'>
			{scoreList.map((scoreItem, index) => (
				<div
					key={`${imageNames[index]} ${scoreList[index].score}`}
					className='scoreGrid'
				>
					<div>{index + 1}</div>
					<ImageCard
						src={resizedImages[scoreList[index].index]}
						name={imageNames[scoreList[index].index]}
						className='scoreCard'
					/>
					<div className='scorePoint'>{`${scoreItem.score} point`}</div>
				</div>
			))}
		</div>
	);
};

export default ScoreSection;
