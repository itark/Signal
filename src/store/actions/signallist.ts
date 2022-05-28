import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { SignallistState } from '../reducers/signallist';
import Signal from '../../models/Signal';

export const SET_SIGNALLIST_DATA = 'SET_SIGNALLIST_DATA';

export const fetchTradesData = () => {
  return async (dispatch: ThunkDispatch<SignallistState, void, Action>) => {
    try {
      const longTradesResponse = await fetch(
        `https://itark.loca.lt/frosk-analyzer/longtrades`
      );
      const longTradesResponseData = await longTradesResponse.json();
      const signalData: Signal[] = [];
      longTradesResponseData.forEach((signal: {  id: number; date: number; dateReadable: string; price: number; securityName: string; strategy: string; type: string; }) => {
        signalData.push(
          new Signal(
            signal.id,
            signal.date,
            signal.dateReadable,
            signal.price,
            signal.securityName,
            signal.strategy,
            signal.type
          )
        );
      });     
      dispatch({
        type: SET_SIGNALLIST_DATA,
        signalData: signalData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const updateSignalData = (newData: Signal[]) => {
  return async (dispatch: ThunkDispatch<SignallistState, void, Action>) => {
    dispatch({
      type: SET_SIGNALLIST_DATA,
      signalData: newData,
    });
  };
};
