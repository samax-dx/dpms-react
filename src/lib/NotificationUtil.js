export const NotificationUtil = {
    generateKey: cn => `${cn}_${Math.floor(Math.random() * 10000)}_${Date.now()}`
};
