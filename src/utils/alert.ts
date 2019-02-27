import { Alert } from '../types/alert';

export const parseAlerts = (alerts: Alert[]) =>
  Object.keys(alerts).map((key: string) => {
    const alert = alerts[key];
    return {
      ...alert,
      dismissed: false,
      expire: new Date(alert.expire),
      priority: alert.priority || 0,
      start: new Date(key),
    };
  });
