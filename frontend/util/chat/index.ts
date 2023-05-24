import { chatTargetState } from '@/recoil/atom';
import { useSetRecoilState } from 'recoil';

export const onChat = async () => {
  const onChatPage = `${window.location.href}chat`;
  window.open(onChatPage, '_blank', 'width=500,height=600');
};

export const onChatCreate = async (targetId: number) => {
  const setChatTarget = useSetRecoilState(chatTargetState);
  setChatTarget(targetId); //타겟 설정하고 페이지 오픈
  const onChatPage = `${window.location.href}chat/create`;
  window.open(onChatPage, '_blank', 'width=500,height=600');
};
