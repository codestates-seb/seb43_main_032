interface crew {
  [key: string]: string;
}
interface tag extends crew {}
interface tech extends crew {}

type wantCrew = {
  position: string;
  number: number;
  acceptedNumber: number;
};

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
