import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import NotFound from "./pages/notFound";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
