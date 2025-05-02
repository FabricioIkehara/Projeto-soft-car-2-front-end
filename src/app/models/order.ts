export interface Order {
  id: number;
  client: string;
  carro: string;
  status: string;
  created_at: string;
}

const order: Order = {
  id: 1,
  client: 'Cliente Exemplo',
  carro: 'Modelo Exemplo',
  status: 'Em Andamento',
  created_at: '2024-10-24T10:00:00Z'
};
