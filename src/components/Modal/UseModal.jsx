import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function show() {
    setIsShowing(true);
  }

  function hide() {
    setIsShowing(false);
  }

  return {
    isShowing,
    hide,
    show,
  }
};

export default useModal;