import { api } from '.';

export const getAllData = async () => {
  const data = await api(`/projects/findAll?size=1000&page=1`).then(
    (res) => res.data.data
  );
  return data;
};
