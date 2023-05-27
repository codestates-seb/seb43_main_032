import { Chat, UserState } from '@/types/user';
import { atom } from 'recoil';
import { RecoilEnv } from 'recoil';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const loggedInUserState = atom<UserState | null>({
  key: 'loggedInUserState',
  default: null,
});
export const navModalState = atom({
  key: 'navModalState',
  default: false,
});
export const isContactState = atom({
  key: 'isContactState',
  default: false,
});
export const chatState = atom<Chat[]>({
  key: 'chatState',
  default: [],
});
export const viewMemberIdState = atom({
  key: 'viewMemberIdState',
  default: 0,
});
export const communityTagState = atom({
  key: 'communityTagState',
  default: '',
});
export const propjectTagState = atom({
  key: 'propjectTagState',
  default: '',
});
