import { useEffect, useState, useCallback } from "react";
import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import "./App.css";

const App = () => {
  // State initialization
  // step size
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem("step");
    return saved !== null ? JSON.parse(saved) : 1;
  });

  // Positive only count
  const [countPositive, setCountPositive] = useState(() => {
    const saved = localStorage.getItem("countPositive");
    return saved !== null ? JSON.parse(saved) : false;
  });

  // count
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved !== null ? JSON.parse(saved) : 0;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem("step", JSON.stringify(step));
  }, [step]);

  useEffect(() => {
    localStorage.setItem("countPositive", JSON.stringify(countPositive));
  }, [countPositive]);


  // handlers
  const handleCountPositive = (event) => {
    const newValue = event.target.checked;
    setCountPositive(newValue);
    if (newValue && count < 0) setCount(0);
  };

  const Increment = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  const Decrement = useCallback(() => {
    setCount((prev) => {
      if (countPositive && prev <= 0) return prev;
      else if (countPositive && (prev - step) < 0) return 0;
      return prev - step;
    });
  }, [countPositive, step]);

  const Reset = useCallback(() => {
    setCount(0);
    setStep(1);
    setCountPositive(false);
  }, []);

  const handleStep = (event) => {
    const value = Number(event.target.value);
    setStep(isNaN(value) ? 1 : value);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowUp") {
        Increment();
      } else if (event.key === "ArrowDown") {
        Decrement();
      } else if (event.key.toLowerCase() === "r") {
        Reset();
      }
    },
    [Increment, Decrement, Reset]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);


  return (
    <div className="main">
      <h1>Counter App</h1>

      <div className="container">
        <div className="displayContainer">
          <div className="display">
            <button onClick={Increment} className="btn">
              +
            </button>
            <p className="counter">{count}</p>
            <button onClick={Decrement} className="btn">
              -
            </button>
          </div>

          <label className="checkBox">
          Count Positive Only
            <input
              type="checkbox"
              checked={countPositive}
              onChange={handleCountPositive}
            />
            
          </label>

          <label className="stepSize">
            Step Size
            <input
              type="text"
              value={step}
              onChange={handleStep}
            />
          </label>

          <button onClick={Reset} className="resetBtn">
            Reset
          </button>
        </div>
      </div>

      <footer className="footer">
        <div >
          &copy; DKP 2025
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/deepakprajapati07" target="_blank" rel="noreferrer">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/deepakprajapati07" target="_blank" rel="noreferrer">
            <FaGithub size={24} />
          </a>
          <a href="/" target="_blank" rel="noreferrer">
            <FaGlobe size={24} />
          </a>
        </div>
      </footer>

    </div>
  );
};

export default App;
