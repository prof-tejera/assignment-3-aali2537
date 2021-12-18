import styled from "styled-components";

const NavContainer = styled.div`
  background-color: #186bf2;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.23);
  @media (min-width: 1600px) {
    margin-bottom: 4em;
  }
  ul {
    margin-top: 0;
    list-style: none;
    padding: 1em;
    display: flex;
    justify-content: end;
    color: white;
  }

  li {
    margin-right: 1em;
  }

  li:first-child {
    margin-right: auto;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    color: #2b193d;
  }
`;

export default NavContainer;
