import { api } from '.';

export default async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
