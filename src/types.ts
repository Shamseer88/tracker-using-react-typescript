export type Status = "todo" | "doing" | "done";

export interface BaseItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: Status;
}

export interface DocumentItem {
  id: string;
  name: string;
  link: string;
}

export interface BillItem {
  id: string;
  name: string;
  amount: number;
  lastDate: string;
  createdMonth: string;
  paid: boolean;
}
