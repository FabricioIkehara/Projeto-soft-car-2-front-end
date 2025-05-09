export interface Order {
  id: number;
  client: string;
  carro: string;
  status: string;
  created_at: string;
  telefone: string;      
  email: string;         
  cor?: string;           
  placa?: string;         
  servicos?: any[];       
  
}