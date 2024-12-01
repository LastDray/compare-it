import './app.css';

import UploadingSection from '../modules/uploading-section';
import { useEffect, useState } from 'react';
import CompareSection from '../modules/compare-section';
import { getMatches } from '../shared/helpers/getMatches';
import { ScoreType } from '../shared/types/score';
import { shaffle } from '../shared/helpers/shaffle';
import ScoreSection from '../modules/score-section';

function App() {
	const handleClick = () => {
		if (!resizedImages.length) {
			setErrorMessage('Загрузить хотя бы одно изображение!');
		} else {
			setIsReady(true);
			setErrorMessage('');
		}
	};

	const [resizedImages, setResizedImages] = useState<string[]>([]);
	const [imageNames, setImageNames] = useState<string[]>([]);
	const [isReady, setIsReady] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [scoreList, setScoreList] = useState<ScoreType[]>();
	const [matches, setMatches] = useState<number[][]>([]);

	useEffect(() => {
		if (resizedImages.length) {
			setErrorMessage('');
		}

		setScoreList(
			resizedImages.map((_, index) => {
				return { index, score: 0 };
			}),
		);
		const matches = getMatches(resizedImages.map((_, index) => index));
		setMatches(shaffle(matches));
	}, [resizedImages]);

	console.log(scoreList);

	return (
		<div className='app'>
			{!isReady && !isFinish && (
				<UploadingSection
					handleStart={handleClick}
					setResizedImages={setResizedImages}
					resizedImages={resizedImages}
					setImageNames={setImageNames}
					imageNames={imageNames}
					errorMessage={errorMessage}
				/>
			)}
			{isReady && !isFinish && (
				<CompareSection
					resizedImages={resizedImages}
					imageNames={imageNames}
					matches={matches}
					setScoreList={setScoreList}
					setIsReady={setIsReady}
					setIsFinish={setIsFinish}
				/>
			)}
			{!isReady && isFinish && (
				<ScoreSection
					imageNames={imageNames}
					resizedImages={resizedImages}
					scoreList={scoreList ?? [{ index: 0, score: 0 }]}
				/>
			)}
		</div>
	);
}

export default App;

// Проверка на формат файла и на его размер
// Возможность перейти к состязанию +
// Добавить состояние загрузки и скелетоны
// Если много изображений подряд то обрабатывать их по несколько штук (Не все сразу)
