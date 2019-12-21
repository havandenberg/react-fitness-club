export interface Coach {
  bio: string;
  id: string;
  name: string;
  profilePhotoUrl: string;
}

export interface Division {
  id: string;
  name: string;
}

export interface Program {
  aboutUrl: string;
  divisions: Division[];
  eventBackground: string;
  eventColor: string;
  id: string;
  logoSrc: string;
  name: string;
  noMembershipRequired?: boolean;
}

export interface ProgramContent {
  description: string;
  id: string;
  name: string;
}
