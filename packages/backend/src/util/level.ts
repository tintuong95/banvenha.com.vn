export const setLevel = (
	point
): {
	level: number;
	processing: number;
} => {
	if (point >= 0 && point <= 1000) {
		return {
			level: 1,
			processing: handleProcessing(1000, point),
		};
	} else if (point > 1000 && point <= 3000) {
		return {
			level: 2,
			processing: handleProcessing(2000, point),
		};
	} else if (point > 3000 && point <= 5000) {
		return {
			level: 2,
			processing: handleProcessing(2000, point),
		};
	} else if (point > 5000 && point <= 7000) {
		return {
			level: 2,
			processing: handleProcessing(2000, point),
		};
	} else if (point > 7000 && point <= 10000) {
		return {
			level: 2,
			processing: handleProcessing(3000, point),
		};
	}
};

const handleProcessing = (between, point) => {
	const far = +point - 1000;
	return Math.round((far / between) * 100);
};
