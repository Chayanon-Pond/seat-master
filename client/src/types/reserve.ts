export type Reserve = {
  id: string;
  title: string;
  description?: string;
  seats?: number;
  reserved?: boolean;
  created_at?: string | Date;
  updated_at?: string | Date;
};
