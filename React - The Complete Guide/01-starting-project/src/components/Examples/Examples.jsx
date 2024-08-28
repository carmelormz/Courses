import { useState } from "react";

import TabButton from "../TabButton/TabButton.jsx";
import Section from "../Section/Section.jsx";

import { EXAMPLES } from "../../data.js";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  const clickHandler = (buttonId) => {
    setSelectedTopic(buttonId);
  };

  const isActive = (topic) => {
    return topic === selectedTopic;
  };

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  return (
    <Section title="Example" id="examples">
      <menu>
        <TabButton
          onClick={() => clickHandler("components")}
          isActive={isActive("components")}
        >
          Components
        </TabButton>
        <TabButton
          onClick={() => clickHandler("jsx")}
          isActive={isActive("jsx")}
        >
          JSX
        </TabButton>
        <TabButton
          onClick={() => clickHandler("props")}
          isActive={isActive("props")}
        >
          Props
        </TabButton>
        <TabButton
          onClick={() => clickHandler("state")}
          isActive={isActive("state")}
        >
          State
        </TabButton>
      </menu>
      {tabContent}
    </Section>
  );
}
