import { useContext } from 'react';
import { StateContext } from '../components/StateProvider';

export function useStateContext() {
  return useContext(StateContext);
}