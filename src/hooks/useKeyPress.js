function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = React.useState(false);

  function handleKeyDown({ key }) {
    if (key === targetKey) setKeyPressed(true);
  }

  function handleKeyUp({ key }) {
    if (key === targetKey) setKeyPressed(false);
  }

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keyPressed;
}

export default useKeyPress;
