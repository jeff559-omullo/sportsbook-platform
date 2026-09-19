export class AuthResponseDto {
  user: {
    id: string;
    phone: string;
    role: string;
  };

  accessToken: string;

  refreshToken: string;
}