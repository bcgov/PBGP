import { useEffect } from 'react';

export const useConfirmationOnExit = () => {

  /**
   * Prompts the user before refreshing or closing the tab.
   */
  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('beforeunload', beforeunload);
    return () => window.removeEventListener('beforeunload', beforeunload);
  }, []);

  const beforeunload = (event) => {
    event.preventDefault();
    event.returnValue = 'alert';
  };
}
