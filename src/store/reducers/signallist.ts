import { AnyAction } from 'redux';
import Signal from '../../models/Signal';
import { SET_SIGNALLIST_DATA } from '../actions/signallist';

export interface SignallistState {
  signallistData: Signal[];
}

const initialState: SignallistState = {
  signallistData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SIGNALLIST_DATA:
      return {
        signallistData: action.signalData,
      };
  }
  return state;
};
