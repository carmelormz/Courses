import { useState } from "react";
import { CORE_CONCEPTS, EXAMPLES } from "./data.js";

import Header from "./components/Header/Header.jsx";
import CoreConcept from "./components/CoreConcept/CoreConcept.jsx";
import TabButton from "./components/TabButton/TabButton.jsx";

function App() {
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
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((concept, i) => (
              <CoreConcept {...concept} key={i} />
            ))}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
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
        </section>
      </main>
    </div>
  );
}

export default App;
