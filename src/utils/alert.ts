import { Alert } from '../types/alert';

export const parseAlerts = (alerts: Alert[]) =>
  Object.keys(alerts).map((key: string) => {
    const alert = alerts[key];
    return {
      ...alert,
      dismissed: false,
      expire: new Date(alert.expire),
      start: new Date(key),
    };
  });
