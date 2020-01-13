export interface Division {
  id: string;
  name: string;
}

export interface Instructor {
  bio?: React.ReactNode;
  name: string;
  logoSrc?: string;
  photoSrc?: string;
}

export interface Program {
  aboutUrl: string;
  divisions: Division[];
  eventBackground: string;
  eventColor: string;
  id: string;
  logoSrc: string;
  name: string;
}

export interface ProgramContent {
  description: React.ReactNode;
  id: string;
  instructors: Instructor[];
  name: string;
}
