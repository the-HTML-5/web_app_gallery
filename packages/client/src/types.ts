export interface WebApp {
  _id: string;
  manifestURL: string;
  startURL: string;
  name: string;
  description: string;
  icons: Icon[];
  appleMobileWebAppCapable: boolean;
  category: Category;
  screenshots: Screenshot[];
  themeColor?: string;
  backgroundColor?: string;
  averageRating: number;
  reviews?: Review[];
}

export type Category =
  | "books"
  | "business"
  | "donations"
  | "education"
  | "entertainment"
  | "finance"
  | "fitness"
  | "food"
  | "fundraising"
  | "games"
  | "government"
  | "health"
  | "kids"
  | "lifestyle"
  | "magazines"
  | "medical"
  | "music"
  | "navigation"
  | "news"
  | "personalization"
  | "photo"
  | "politics"
  | "productivity"
  | "security"
  | "shopping"
  | "social"
  | "sports"
  | "travel"
  | "utilities"
  | "weather";

export const categories: Category[] = [
  "books",
  "business",
  "donations",
  "education",
  "entertainment",
  "finance",
  "fitness",
  "food",
  "fundraising",
  "games",
  "government",
  "health",
  "kids",
  "lifestyle",
  "magazines",
  "medical",
  "music",
  "navigation",
  "news",
  "personalization",
  "photo",
  "politics",
  "productivity",
  "security",
  "shopping",
  "social",
  "sports",
  "travel",
  "utilities",
  "weather"
];

export function isCategory(category: any): category is Category {
  return categories.includes(category);
}

export interface Icon {
  src: string;
  sizes?: string;
  purpose?: string;
  type?: string;
}

export interface Screenshot {
  src: string;
  sizes?: string;
  label?: string;
  platform?: Platform;
}

export type Platform =
  | "narrow"
  | "wide"
  | "android"
  | "chromeos"
  | "ios"
  | "kaios"
  | "macos"
  | "windows"
  | "windows10x"
  | "xbox"
  | "chrome_web_store"
  | "play"
  | "itunes"
  | "microsoft";

export const platforms: Platform[] = [
  "narrow",
  "wide",
  "android",
  "chromeos",
  "ios",
  "kaios",
  "macos",
  "windows",
  "windows10x",
  "xbox",
  "chrome_web_store",
  "play",
  "itunes",
  "microsoft"
];

export function isPlatform(platform: any): platform is Platform {
  return platforms.includes(platform);
}

export interface Review {
  _id: string;
  rating: number;
  review?: string;
  user: SanitizedUser;
}

export interface SanitizedUser {
  firstName: string;
  lastName: string;
}

export interface User extends SanitizedUser {
  email: string;
  password: string;
}

export type ApiResponse<T> = { status: "ok"; data: T };

export type PaginatedApiResponse<T> = {
  status: "ok";
  data: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPage: number | null;
  hasPrevPage: boolean;
  prevPage: number | null;
  pagingCounter: number;
};

export type ApiError = { status: "error"; message: string };
