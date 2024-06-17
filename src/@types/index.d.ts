import { JwtAdminDto, JwtUserDto } from 'src/api/auth/dto/jwt-dto';
declare global {
  namespace Express {
    export interface User extends JwtUserDto, JwtAdminDto {}
  }
}
