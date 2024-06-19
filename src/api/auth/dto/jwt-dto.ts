export type JwtUserDto = {
  user_id: number;
  account: string;
  name: string;
  roles: string;
  session_id: string;
};

export type JwtAdminDto = {
  admin_id: number;
  account: string;
  name: string;
  roles: string;
  session_id: string;
};
