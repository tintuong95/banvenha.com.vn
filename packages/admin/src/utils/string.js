export const truncate = (length, string) => {
	return _.truncate(string, {
		length,
		separator: ' ',
	});
};
