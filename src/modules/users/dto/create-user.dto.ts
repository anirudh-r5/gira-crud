export class CreateUserDto {
  name: string;
  email: string;
  avatarUrl?: string;
  projectId?: number | null;
}
