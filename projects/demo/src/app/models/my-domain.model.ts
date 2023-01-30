import { Boxed } from "ngrx-forms";

export interface MyDomain {
  birthDate?: string;
  fruit?: string;
  vegetables?: Boxed<string[]>
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
