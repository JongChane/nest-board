export type JwtUserDto = {
  user_idx: number;
  account: string;
  name: string;
  roles: string;
  session_id: string;
};

export type JwtAdminDto = {
  admin_idx: number;
  account: string;
  name: string;
  roles: string;
  session_id: string;
};
