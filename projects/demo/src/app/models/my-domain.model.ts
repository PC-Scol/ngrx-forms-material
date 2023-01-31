import { Boxed } from "ngrx-forms";

export interface Country {
  code: string;
  label: string;
}

export interface MyDomain {
  today?: string;
  now?: string;
  birthDate?: string;
  birthCountry?: string;
  fruit?: string;
  vegetables?: Boxed<string[]>
  gender?: string;
  name?: string;
  acceptTerms?: boolean;
}

export const fruits = [
  { code: 'F1', label: 'apple' },
  { code: 'F2', label: 'orange' },
  { code: 'F3', label: 'banana' },
  { code: 'F4', label: 'strawberry' },
  { code: 'F5', label: 'pineapple' },
]

export const vegetables = [
  { code: 'V1', label: 'carrot' },
  { code: 'V2', label: 'tomato' },
  { code: 'V3', label: 'potato' },
  { code: 'V4', label: 'onion' },
  { code: 'V5', label: 'cucumber' },
]

export const countries = [
  { code: 'C1', label: 'Afghanistan' },
  { code: 'C2', label: 'France' },
  { code: 'C3', label: 'Germany' },
  { code: 'C4', label: 'Italy' },
  { code: 'C5', label: 'Japan' },
  { code: 'C6', label: 'United States' },
  { code: 'C7', label: 'United Kingdom' },
  { code: 'C8', label: 'Spain' },
  { code: 'C9', label: 'China' },
  { code: 'C10', label: 'Russia' },
]
