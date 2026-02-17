export interface IService {
  _id?: string;
  title: string;
  description: string;
  category: 'consulting' | 'development' | 'marketing';
  price: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClient {
  _id?: string;
  name: string;
  email: string;
  plan: 'basic' | 'premium' | 'enterprise';
  active: boolean;
  servicesUsed: string[];
  createdAt: Date;
}
