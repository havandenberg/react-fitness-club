export interface Alert {
  body?: string;
  dismissed: boolean;
  expire: Date;
  header?: string;
  id: string;
  start: Date;
  showStart?: boolean;
}
