export interface Category {
  id: string;
  name: string;
  nameBg: string;
  icon: string;
  slug: string;
  count: number;
  color: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: "BGN" | "EUR";
  category: string;
  subcategory?: string;
  images: string[];
  location: string;
  city: string;
  createdAt: string;
  views: number;
  isFeatured: boolean;
  isUrgent: boolean;
  condition?: "new" | "like-new" | "good" | "fair";
  seller: Seller;
  specs?: Record<string, string>;
}

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  memberSince: string;
  responseTime: string;
  activeListings: number;
}

export interface SearchSuggestion {
  text: string;
  category?: string;
  count?: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  listing: Listing;
  otherUser: Seller;
  lastMessage: Message;
  unreadCount: number;
}
