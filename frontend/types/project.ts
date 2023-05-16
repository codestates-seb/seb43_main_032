interface crew {
  [key: string]: string;
}
export interface wantCrew {
  position: string;
  number: number;
  acceptedNumber: number;
}

export interface tag extends crew {}
export interface tech extends crew {}

export type Job = {
  [key: string]: { want: number; current: number };
};

export type Project = {
  acceptedCrewList: crew[];
  content: string;
  endDate: string;
  fieldList: tag[];
  memberId: number;
  positionCrewList: wantCrew[];
  projectId: number;
  startDate: string;
  status: string;
  techStackList: tech[];
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
