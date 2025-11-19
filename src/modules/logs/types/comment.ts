export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  createdAt: string; // ISO string
  content: string;
}