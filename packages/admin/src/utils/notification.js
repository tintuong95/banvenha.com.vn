import { notification } from "antd";

export const openNotification = (type, message, description) => {
	notification[type]({
		type,
		message,
		description,
		placement:"bottomRight",
		onClick: () => {
			console.log('Notification Clicked!');
		},
	});
};
