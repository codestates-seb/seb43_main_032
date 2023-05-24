import { errorAlert } from '@/components/alert/Alert';
import { getCookie } from '../cookie';

export const onChat = async () => {
  const currentURL = window.location.href;
  const domain = new URL(currentURL).origin;
  const onChatPage = `${domain}/chat`;
  window.open(onChatPage, '_blank', 'width=500,height=600');
};

export const onChatCreate = async (id: number) => {
  if (!getCookie('accessToken')) {
    return errorAlert('로그인을 부탁드려요.', '쪽지 보내기');
  }
  window.localStorage.setItem('target', String(id));
  const currentURL = window.location.href;
  const domain = new URL(currentURL).origin;
  const onChatPage = `${domain}/chat/create`;
  window.open(onChatPage, '_blank', 'width=500,height=600');
};
