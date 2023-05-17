export interface Saunter {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  isFavourite: boolean;
  path: any;
}

export type Rights = "driver" | "passanger";
