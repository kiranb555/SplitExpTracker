import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import store,{persistor} from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Spinner } from "reactstrap";
import Home from "./pages/home";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.scss";

const About = React.lazy(() => import("./pages/about"));
const Contact = React.lazy(() => import("./pages/contact"));
const NotFound = React.lazy(() => import("./pages/notFound"));
const Posts = React.lazy(() => import("./pages/posts"));
const Post = React.lazy(() => import("./pages/post"));

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Header />
          <Router>
            <Suspense
              fallback={
                <div className="App__spinner">
                  <Spinner color="dark" size="sm" />
                </div>
              }
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/posts" component={Posts}></Route>
                <Route exact path={`/posts/:ID`} component={Post}></Route>
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
          <Footer />
            </div>
        </PersistGate>
      </Provider>
  );
}

export default App;
