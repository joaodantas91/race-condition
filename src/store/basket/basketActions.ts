
// Externals
import { Action, Dispatch } from 'redux';
import axios from 'axios'

import BasketItem from '../../models/BasketItem';
import { IState } from '../rootReducer';

export function incrementItem (basketItem: BasketItem) {
  return async (dispatch: Dispatch<Action>, getState: () => IState) => {
    const state: IState = getState();

    // Call this same function after the previous one finish to avoid concurrency
    if (state.basket.calculatingBasketInApi) {
      dispatch({
        type: 'increment-queued-action'
      });
      await (new Promise<void>((resolve) => {
        const checkState = () => {
          const currentState = getState();
          const targetState = currentState.basket.calculatingBasketInApi;

          if (!targetState) {
            resolve();
          } else {
            setTimeout(checkState, 100); // Poll every 100ms
          }
        };

        checkState();
      }))

      return (() => {

        incrementItem(basketItem)(dispatch, getState);

        dispatch({
          type: 'decrement-queued-action'
        });
      })();
    }

    dispatch({
      type: 'calculating_basket',
      payload: true
    });

    const basketItems = state.basket.items.map((item) => {
      if (item.id === basketItem.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }

      return item;
    });

    const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
      const basketItemTotal = currentValue.itemPrice * currentValue.quantity;

      return previousValue + basketItemTotal;
    }, 0);


    dispatch({
      type: 'update-basket',
      payload: basketItems
    });

    // Simulate a real validate basket
    axios.get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
      .then(function () {
        dispatch({
          type: 'update-basket-totals',
          payload: newTotal
        });
      })
      .finally(() => {
        dispatch({
          type: 'calculating_basket',
          payload: false
        });
      })

  }
}

export function decrementItem (basketItem: BasketItem) {
  return async (dispatch: Dispatch<Action>, getState: () => IState) => {
    const state: IState = getState();

    // Call this same function after the previous one finish to avoid concurrency
    if (state.basket.calculatingBasketInApi) {
      dispatch({
        type: 'increment-queued-action'
      });
      await (new Promise<void>((resolve) => {
        const checkState = () => {
          const currentState = getState();
          const targetState = currentState.basket.calculatingBasketInApi;

          if (!targetState) {
            resolve();
          } else {
            setTimeout(checkState, 100); // Poll every 100ms
          }
        };

        checkState();
      }))

      return (() => {

        decrementItem(basketItem)(dispatch, getState);

        dispatch({
          type: 'decrement-queued-action'
        });
      })();
    }


    const foundItem = state.basket.items.find((item) => {
      return item.id === basketItem.id;
    });

    // Disabling 0 quantity
    if (foundItem?.quantity === 1) {
      return;
    }

    dispatch({
      type: 'calculating_basket',
      payload: true
    });

    const basketItems = state.basket.items.map((item) => {
      if (item.id === basketItem.id) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      }

      return item;
    });

    const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
      const basketItemTotal = currentValue.itemPrice * currentValue.quantity;

      return previousValue + basketItemTotal;
    }, 0);

    dispatch({
      type: 'update-basket',
      payload: basketItems
    });

    // Simulate a real validate basket
    axios.get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
      .then(function () {
        dispatch({
          type: 'update-basket-totals',
          payload: newTotal
        });
      })
      .finally(() => {
        dispatch({
          type: 'calculating_basket',
          payload: false
        });
      })

  }
}