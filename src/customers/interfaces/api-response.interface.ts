export interface ApiResponse<T> {
  code: number;
  message: string;
  id?: string;
  data?: T;
}
