import uploadFile from '../api/uploadFile';

interface AnyObj {
  [key: string]: any;
}
export function updateData(origin: AnyObj, newData: AnyObj) {
  const filteredData = Object.fromEntries(
    Object.entries(newData).filter(([key, value]) => {
      return !(value === '' || (Array.isArray(value) && value.length === 0));
    })
  );
  const updatedOrigin = {
    ...origin,
    ...filteredData,
  };
  const { memberId, email, totalStar, ...updatedData } = updatedOrigin;
  updatedData.yearOfDev = +updatedData.yearOfDev;
  return updatedData;
}

export async function mergeData(data: AnyObj, image: File[], stacks: AnyObj[]) {
  if (image && image.length > 0) {
    const profileImageUrl = (await uploadFile(data.image[0]))[0];
    data.profileImageUrl = profileImageUrl;
  }
  delete data.image;
  if (stacks.length > 0) {
    data.techList = stacks.map((el: AnyObj) => el.tech);
  }
}
