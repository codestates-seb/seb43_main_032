interface Crew {
  [key: string]: string;
}
export interface FiledTag extends Crew {}
export interface Tech extends Crew {}

type WantCrew = {
  position: string;
  number: number;
  acceptedNumber: number;
};

export type Job = {
  [key: string]: { want: number; current: number };
};

export type Project = {
  acceptedCrewList: Crew[];
  content: string;
  endDate: string;
  fieldList: FiledTag[];
  memberId: number;
  positionCrewList: WantCrew[];
  projectId: number;
  startDate: string;
  status: string;
  techStackList: Tech[];
  thumbnailImageUrl: string;
  title: string;
  totalLikes: number;
  views: number;
  writerPosition: string;
};

export type PostState = {
  id: number;
  heart: boolean;
  want: string;
};
