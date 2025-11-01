
 export type UserRole = "admin" | "user" | "guest" | "hater";

export interface BaseUser {
  username: string;
  role: UserRole;
}

export interface Purchase {
  purchaseId: number;
  productId: number;
  quantity: number;
  purchaseDate: string;
  productName?: string; 
  productPrice?: number;
}

export interface RealUser extends BaseUser {
  id: number; 
  role: "admin" | "user"; 
  purchases?: Purchase[];
}

export interface GuestUser extends BaseUser {
  id: number; 
  role: "guest" | "hater"; 
}


export type AppUser = RealUser | GuestUser;

export type Category = 'fishes' | 'plants' | 'food' | null;

export function isRealUser(user: AppUser | null): user is RealUser {
  return user !== null && (user.role === "admin" || user.role === "user");
}

export interface Comments extends BaseUser {
  id: number;
  userId?: number | null;
  text: string;
  createdAt: string; 
};
