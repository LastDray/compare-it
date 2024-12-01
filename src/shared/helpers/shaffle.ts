type shaffleType = (sortedArray: number[][]) => number[][];

export const shaffle: shaffleType = sortedArray => {
	return sortedArray.sort(() => Math.random() - 0.5);
};
