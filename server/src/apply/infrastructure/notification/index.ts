import { AppNotification } from './app.notification';
import { EmailNotification } from './email.notification';

export * from './email.notification';
export * from './app.notification';

export const NotificationHandlers = [
    EmailNotification,
    AppNotification];