import { useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div data-testId={"apppppp"}>
      <h1>Host</h1>
    </div>
  );
}
