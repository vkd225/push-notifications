type NotificationFailureMessage = {
    id: string;
    recipients: number;
    errors: Array<string>;
};

export default NotificationFailureMessage;