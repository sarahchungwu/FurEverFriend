import { useIsFetching } from 'react-query'

export function useIsBusy() {
  const isFetching = useIsFetching()
  return isFetching
}
