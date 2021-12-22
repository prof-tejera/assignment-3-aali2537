import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Button from "../components/generic/Button";
import Circle from "../components/generic/Circle";
import Panel from "../components/generic/Panel";
import Label from "../components/generic/Label";
import Input from "../components/generic/Input";
import SquareButton from "../components/generic/SquareButton";
import QueueTimerPanel from "../components/generic/QueueTimerPanel";

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
                <Button icon="play" size={60} border={false} />
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
              {
                prop: "size",
                description: "px value of width and height",
                type: "number",
                defaultValue: "N/A",
              },
              {
                prop: "border",
                description: "Determines if button has colored border or not",
                type: "boolean",
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
            title="Input "
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
          <DocumentComponent
            title="Square Button "
            component={
              <div style={{ position: "relative" }}>
                <SquareButton type={"Start"} enterFrom={"Left"} />
              </div>
            }
            propDocs={[
              {
                prop: "type",
                description: "Determines the text, color, and icon of Button ",
                type: "String",
                defaultValue: "N/A",
              },
              {
                prop: "clickHandler",
                description: "event handler",
                type: "function",
                defaultValue: "N/A",
              },
              {
                prop: "enterFrom",
                description:
                  "Determines which side the colored animation slides in from",
                type: "String",
                defaultValue: "N/A",
              },
            ]}
          />
          <DocumentComponent
            title="QueueTimerPanel "
            component={
              <div style={{ position: "relative" }}>
                <QueueTimerPanel
                  timerType={"Tabata"}
                  roundSetting={2}
                  workLength={3}
                  restLength={5}
                />
              </div>
            }
            propDocs={[
              {
                prop: "timerType",
                description:
                  "Type of timer to determine what settings to show on backside ",
                type: "String",
                defaultValue: "N/A",
              },
              {
                prop: "secondSetting",
                description: "Shows how many seconds timer has",
                type: "function",
                defaultValue: "N/A",
              },
              {
                prop: "minuteSetting",
                description: "Shows how many minutes timer has",
                type: "String",
                defaultValue: "N/A",
              },
              {
                prop: "roundSetting",
                description: "Shows how many rounds timer has",
                type: "String",
                defaultValue: "N/A",
              },
              {
                prop: "workLength",
                description: "Shows how long the work round is",
                type: "String",
                defaultValue: "N/A",
              },
              {
                prop: "restLength",
                description: "Shows how long the rest round is",
                type: "String",
                defaultValue: "N/A",
              },
              {
                prop: "removeHandler",
                description:
                  "Event handler for removing panel when exit button is clicked",
                type: "function",
                defaultValue: "N/A",
              },
              {
                prop: "disableHover",
                description: "Disables flip on hover",
                type: "Boolean",
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
