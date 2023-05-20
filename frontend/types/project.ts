import { MemberInfo } from './types';

type Crew = {
  memberId: number;
  position: string;
  projectId: number;
};

export type FiledTag = {
  field: string;
};

export type Tech = {
  tech: string;
};

export type WantCrew = {
  acceptedNumber: number;
  number: number;
  position: string;
};

export type Project = {
  acceptedCrewList: Crew[];
  content: string;
  createdAt: string;
  endDate: string;
  fieldList: FiledTag[];
  memberInfo: MemberInfo;
  positionCrewList: WantCrew[];
  projectId: number;
  startDate: string;
  status: string;
  techList: Tech[];
  thumbnailImageUrl: string;
  title: string;
  totalAnswers: number;
  totalLikes: number;
  views: number;
  writerPosition: string;
  liked: boolean;
};

export type PostData = {
  startDate: string;
  endDate: string | null | undefined;
  writerPosition: string;
  title: string;
  thumbnailImageUrl: string;
  content: string;
  techList: {
    techList: string[];
  };
  fieldList: {
    fieldList: string[];
  };
  positionCrewList: {
    positionList: string[];
    positionNumberList: number[];
  };
};
