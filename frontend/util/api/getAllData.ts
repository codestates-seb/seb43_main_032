import { api } from '.';

export const getAllProject = async () => {
  const data = await api(`/projects/findAll?size=1000&page=1`).then(
    (res) => res.data.data
  );
  return data;
};

export const getAllCommunity = async () => {
  const data = await api(`/articles/find-all?size=1000&page=1`).then(
    (res) => res.data.data
  );
  return data;
};
