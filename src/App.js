import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import QueueView from "./views/QueueView";
import NavContainer from "./components/generic/NavContainer";
import AddView from "./views/AddView";
import QueueProvider from "./components/context/QueueContext";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

function App() {
  return (
    <Container>
      <Router>
        <NavContainer>
          <nav>
            <ul>
              <li>Aali2537 Assignment 3</li>
              <li>
                <Link to="/">Timers</Link>
              </li>
              <li>
                <Link to="/docs">Documentation</Link>
              </li>
              <li>
                <Link to="/add">Add</Link>
              </li>
            </ul>
          </nav>
        </NavContainer>
        <QueueProvider>
          <Switch>
            <Route path="/add">
              <AddView />
            </Route>
            <Route path="/docs">
              <DocumentationView />
            </Route>
            <Route path="/">
              <QueueView />
            </Route>
          </Switch>
        </QueueProvider>
      </Router>
    </Container>
  );
}

export default App;
