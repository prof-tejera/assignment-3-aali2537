import styled from "styled-components";

const Panel = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  text-align: center;
  padding-top: 3em;
  padding-bottom: 3em;
  border-radius: 1em;
  @media (min-width: 1200px) {
    margin-bottom: 3em;
  }
  @media (min-width: 1600px) {
    margin-bottom: 4em;
  }
  @media (min-width: 1900px) {
    margin-bottom: 4em;
  }
`;

export default Panel;
