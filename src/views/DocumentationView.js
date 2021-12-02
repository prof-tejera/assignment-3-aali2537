import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";
import Circle from "../components/generic/Circle";
import Panel from "../components/generic/Panel";
import Label from "../components/generic/Label";
import Input from "../components/generic/Input";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

class Documentation extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <Title>Documentation</Title>
          <DocumentComponent
            title="Loading spinner "
            component={<Loading />}
            propDocs={[
              {
                prop: "size",
                description: "Changes the size of the loading spinner",
                type: "string",
                defaultValue: "medium",
              },
            ]}
          />
          <DocumentComponent
            title="Button "
            component={
              <div style={{ position: "relative" }}>
                <Button icon="play" />
              </div>
            }
            propDocs={[
              {
                prop: "icon",
                description: "Changes color and icon depending on input",
                type: "string",
                defaultValue: "N/A",
              },
              {
                prop: "left",
                description: "changes css left property for animation purposes",
                type: "number",
                defaultValue: "N/A",
              },
              {
                prop: "top",
                description: "Changes top position for animation purposes",
                type: "number",
                defaultValue: "N/A",
              },
            ]}
          />
          <DocumentComponent
            title="Circle "
            component={<Circle size={100} strokeWidth={10} />}
            propDocs={[
              {
                prop: "size",
                description:
                  "Determines the width and height of the svg element",
                type: "int",
                defaultValue: "450",
              },
              {
                prop: "strokeWidth",
                description: "Determines the thickness of the progress bar",
                type: "int",
                defaultValue: "20",
              },
            ]}
          />
          <DocumentComponent
            title="panel "
            component={<Panel>Panel Content</Panel>}
            propDocs={[
              {
                prop: "N/A",
                description: "Elevated div for paneling look",
                type: "N/A",
                defaultValue: "N/A",
              },
            ]}
          />
          <DocumentComponent
            title="Label "
            component={<Label>Label</Label>}
            propDocs={[
              {
                prop: "N/A",
                description: "White Styled Label",
                type: "N/A",
                defaultValue: "N/A",
              },
            ]}
          />
          <DocumentComponent
            title="Label "
            component={<Input></Input>}
            propDocs={[
              {
                prop: "N/A",
                description: "Styled input for taking settings options",
                type: "N/A",
                defaultValue: "N/A",
              },
            ]}
          />
        </div>
      </Container>
    );
  }
}

export default Documentation;
