export type Role = 'user' | 'assistant' | 'loading';

export interface Message {
  role: Role;
  content: string;
}

export type Language = 'pt' | 'en' | 'es';
