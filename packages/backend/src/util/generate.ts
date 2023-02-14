function zeroPad(num: number, places: number) {
	const zero = places - num.toString().length + 1;
	return Array(+(zero > 0 && zero)).join('0') + num;
}

function randomNumber() {
	return Math.floor(Math.random() * 1000) + 1;
}

export const generateCode = (code: string) => {
	return (
		code + '-' + zeroPad(randomNumber(), 3) + '-' + zeroPad(randomNumber(), 4)
	);
};
