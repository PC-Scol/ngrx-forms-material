import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { NgrxFormState } from 'ngrx-forms-material';
import { MyDomain } from '../../models/my-domain.model';
import * as fromReducer from './my-domain.reducer';

export interface MyState {
    myDomain: NgrxFormState<MyDomain>;
}

export const reducers: ActionReducerMap<any> = {
    myDomain: fromReducer.reducer,
};

export const selectMyState = createFeatureSelector<MyState>('myState');

export { MY_DOMAIN_FORM_ID, formAdapter, initialState } from './my-domain.reducer';
