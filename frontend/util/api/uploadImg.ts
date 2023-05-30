import { errorAlert } from '@/components/alert/Alert';
import { api } from '.';

type ImageUploadType = {
  (
    image: File,
    onSuccess: (url: string) => void,
    onError: (errorMessage: string) => void
  ): void;
};

export const imageUpload: ImageUploadType = async (image, onSuccess) => {
  try {
    const data = new FormData();
    data.append('file', image);
    const res = await api.post('/images/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const url = res.data[0];
    onSuccess(url);
  } catch (error) {
    errorAlert('잠시 후에 다시 시도해주세요.', '이미지 등록');
  }
};
