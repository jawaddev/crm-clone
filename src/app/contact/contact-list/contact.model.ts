export interface IContact {
  email: string;
  company: string;
  firstName: string;
  familyName: string;
  age: number;
  monthlyIncome: number;
  status: eStatus;
  numberOfChildren: number;
}
export enum eStatus {
  Married = 'married',
  Single = 'single',
}
