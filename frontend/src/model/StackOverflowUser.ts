export interface StackOverflowPageUser {
  items: StackOverflowUser[];
}

export interface StackOverflowUser {
  display_name: string;
  location: string;
  user_id: number;
}
