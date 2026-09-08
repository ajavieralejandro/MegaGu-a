import { useEffect, useState } from 'react';

interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: unknown;
}

export function useAsync<T>(factory: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    loading: true,
    error: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps -- deps se recibe como parámetro genérico
  useEffect(() => {
    let active = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    factory()
      .then((data) => {
        if (active) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (active) setState({ data: undefined, loading: false, error });
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps se recibe como parámetro genérico
  }, deps);

  return state;
}
