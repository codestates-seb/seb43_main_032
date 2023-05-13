export type User = {
  member_id: number;
  email: string;
  user_name: string;
  nickname: string;
  about_me: string;
  year_of_dev: number;
  created_at: Date | string;
  updated_at: Date | string;
  deleted: Date | string;
  phone_number: string | number;
  total_star: string | number;
  profile_img: string;
};
