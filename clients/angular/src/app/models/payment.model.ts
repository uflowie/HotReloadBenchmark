export interface Payment {
  id?: number;
  invoiceId: number;
  amount: number;
  method: string;
}
