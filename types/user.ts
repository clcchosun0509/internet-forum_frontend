enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  roles: UserRole[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
