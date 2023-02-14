import { notification } from "antd";

export const openNotification = (type, message, description) => {
	notification[type]({
		type,
		message,
		description,
		onClick: () => {
			console.log('Notification Clicked!');
		},
	});
};
