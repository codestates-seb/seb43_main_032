interface Crew {
  [key: string]: string;
}
export type FiledTag = {
  field: string;
};

export type Tech = {
  tech: string;
};

type WantCrew = {
  position: string;
  number: number;
  acceptedNumber: number;
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
