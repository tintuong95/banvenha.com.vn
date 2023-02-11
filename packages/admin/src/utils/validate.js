export const validateRequired = (message) => ({
	required: true,
	message,
});


export const validateRegex = (message,pattern) => ({
	pattern,
	message,
});
