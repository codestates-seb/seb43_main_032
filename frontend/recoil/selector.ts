import { selector } from 'recoil';
import { loggedInUserState } from './atom';

//유저ID
export const loggedInUserId = selector({
  key: 'loggedInUserId',
  get: ({ get }) => {
    const memberId = get(loggedInUserState)?.memberId;
    return memberId;
  },
});
