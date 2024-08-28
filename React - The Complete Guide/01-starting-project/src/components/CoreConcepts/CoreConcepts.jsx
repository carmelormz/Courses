import CoreConcept from "../CoreConcept/CoreConcept.jsx";
import Section from "../Section/Section.jsx";

import { CORE_CONCEPTS } from "../../data.js";

export default function CoreConcepts() {
  return (
    <Section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((concept, i) => (
          <CoreConcept {...concept} key={i} />
        ))}
      </ul>
    </Section>
  );
}
