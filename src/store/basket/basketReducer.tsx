
import { Action } from "redux";

import BasketItem from '../../models/BasketItem';
import { ActionWithPayload } from "../types/actions";
import { IState } from "../rootReducer";

export interface BasketState {
  calculatingBasketInApi: boolean;
  queuedActions: number;
  items: Array<BasketItem>,
  total: number
}

export const initialState: BasketState = {
  calculatingBasketInApi: false,
  queuedActions: 0,
  items: [
    new BasketItem(1, 'Burger 1', 100),
    new BasketItem(2, 'Burger 2', 200),
  ],
  total: 300
};

export default function basketReducer (
  state: BasketState = { ...initialState },
  action: Action
) {
  switch (action.type) {
    case 'calculating_basket':
      return {
        ...state,
        calculatingBasketInApi: (action as ActionWithPayload<boolean>).payload
      }
    case 'increment-queued-action':
      return {
        ...state,
        queuedActions: state.queuedActions + 1
      }

    case 'decrement-queued-action':
      return {
        ...state,
        queuedActions: state.queuedActions - 1
      }
    case 'update-basket':
      return {
        ...state,
        items: (action as ActionWithPayload<Array<BasketItem>>).payload
      }
    case 'update-basket-totals':
      return {
        ...state,
        total: (action as ActionWithPayload<number>).payload
      }

    default:
      return state;
  }
}

export function selectBasketItems (state: IState): Array<BasketItem> {
  return state.basket.items;
}

export function selectIsCalculatingBasket (state: IState): boolean {
  return state.basket.calculatingBasketInApi;
}

export function selectIsActionQueued (state: IState): boolean {
  return state.basket.queuedActions > 0;
}

export function selectBasketTotal (state: IState): number {
  return state.basket.total;
}