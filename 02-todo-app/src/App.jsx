import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./context/TodoProvider.jsx";
import TodoList from "./components/TodoList.jsx";

const App = () => {
  return (
    <TodoProvider>
      <section className="main">
        <div className="container">
          <Header />
          <TodoForm />
          <TodoList />
        </div>
        <Footer />
      </section>
    </TodoProvider>
  );
};

export default App;
