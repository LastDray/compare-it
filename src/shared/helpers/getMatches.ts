export const getMatches = (teams: number[]) => {
	const matches = teams.flatMap((team, index, teams) => {
		const tempMatches: number[][] = [];
		for (let i = index; i < teams.length; i++) {
			if (team !== teams[i]) {
				tempMatches.push([team, teams[i]]);
			}
		}
		return tempMatches;
	});

	return matches;
};
