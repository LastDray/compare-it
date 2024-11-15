import { useEffect, useState } from 'react';
import './app.css';
import cx from 'clsx';
function App() {
	const MAX_WIDTH = 800;
	const [drag, setDrag] = useState(false);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [images, setImages] = useState<string[]>([]);
	const [resizedImages, setResizedImages] = useState<string[]>([]);
	const [imageNames, setImageNames] = useState<string[]>([]);

	const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDrag(true);
	};

	const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDrag(false);
		console.log('leave');
	};

	const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		let files = e.dataTransfer.files;
		const validImageFiles: File[] = [];
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			validImageFiles.push(file);
		}
		setImageFiles(validImageFiles);
		setImageNames(prev => [
			...prev,
			...validImageFiles.map(file => file?.name),
		]);
		console.log(files);
		setDrag(false);
	};

	useEffect(() => {
		const fileReaders: FileReader[] = [];
		let isCancel = false;
		if (imageFiles.length) {
			const promises = imageFiles.map(file => {
				return new Promise((resolve, reject) => {
					const fileReader = new FileReader();
					fileReaders.push(fileReader);
					fileReader.onload = e => {
						const result = e.target?.result;

						if (result) {
							resolve(result);
						}
					};
					fileReader.onabort = () => {
						reject(new Error('File reading aborted'));
					};
					fileReader.onerror = () => {
						reject(new Error('Failed to read file'));
					};
					fileReader.readAsDataURL(file);
				});
			});

			Promise.all(promises)
				.then(images => {
					if (!isCancel) {
						setImages(images as string[]);
					}
				})
				.catch(reason => {
					console.log(reason);
				});
		}
		return () => {
			isCancel = true;
			fileReaders.forEach(fileReader => {
				if (fileReader.readyState === 1) {
					fileReader.abort();
				}
			});
		};
	}, [imageFiles]);

	useEffect(() => {
		if (images.length) {
			const promises = images.map(imageSrc => {
				return new Promise((resolve, reject) => {
					let resizedData = undefined;
					const img = new Image();
					img.onload = () => {
						const canvas = document.createElement('canvas');
						const aspectRatio = img.width / img.height;
						canvas.width = MAX_WIDTH;
						canvas.height = canvas.width / aspectRatio;
						const ctx = canvas.getContext('2d');
						ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
						resizedData = canvas.toDataURL('image/png');
						if (resizedData) {
							resolve(resizedData);
						}
					};
					img.src = imageSrc;
				});
			});

			Promise.all(promises)
				.then(images => {
					setResizedImages(prev => [...prev, ...images] as string[]);
				})
				.catch(reason => {
					console.log(reason);
				});
		}
	}, [images]);

	return (
		<div className='app'>
			<div>
				{drag ? (
					<div
						className={cx('drop', { active: drag })}
						onDragStart={e => dragStartHandler(e)}
						onDragLeave={e => dragLeaveHandler(e)}
						onDragOver={e => dragStartHandler(e)}
						onDrop={e => onDropHandler(e)}
					>
						Отпустите файлы для загрузки
					</div>
				) : (
					<div
						className={cx('drop')}
						onDragStart={e => dragStartHandler(e)}
						onDragLeave={e => dragLeaveHandler(e)}
						onDragOver={e => dragStartHandler(e)}
					>
						Перенесите файлы, чтобы загрузить их
					</div>
				)}
			</div>
			<div className='images'>
				<h2 className='header'>
					Загружено изображений {resizedImages.length}
				</h2>
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
			</div>
		</div>
	);
}

export default App;

// Проверка на формат файла и на его размер
// Возможность перейти к состязанию
// Добавить состояние загрузки и скелетоны
// Если много изображений подряд то обрабатывать их по несколько штук (Не все сразу)
