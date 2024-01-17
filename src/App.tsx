import "./App.css";
import { AddQuote } from "./components/AddQuote/addQuote";
import { Header } from "./components/Header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <AddQuote />
    </div>
  );
}

export default App;
