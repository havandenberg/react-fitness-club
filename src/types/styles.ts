export type StyleValue = string | number | Array<string | number>;
export interface StyleSet {
  [key: string]: StyleValue;
}

export type Breakpoint =
  | 'all'
  | 'desktop'
  | 'mobile'
  | 'small'
  | 'tablet'
  | 'tabletDown'
  | 'tabletUp';

export type ButtonStyle = 'primary' | 'secondary';
export type CheckboxRadioInputType = 'checkbox' | 'radio';
export type Scale = 'big' | 'small';
export type ToggleStyle = 'primary' | 'secondary';
