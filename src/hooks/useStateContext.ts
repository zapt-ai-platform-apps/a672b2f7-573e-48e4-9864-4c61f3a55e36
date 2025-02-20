import { useContext } from 'react';
import { StateContext, StateContextType } from '../context/StateContext';

export function useStateContext(): StateContextType {
  return useContext(StateContext);
}