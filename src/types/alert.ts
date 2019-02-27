export interface Alert {
  body?: string;
  dismissed: boolean;
  expire: Date;
  header?: string;
  id: string;
  priority: number;
  start: Date;
  showStart?: boolean;
}
