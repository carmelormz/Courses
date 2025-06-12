import { use } from 'react';
import { useAccordionContext } from './Accordion';

export default function AccordionItem({ id, className, title, children }) {
  const { openItemId, toggleItem } = useAccordionContext();

  const isOpen = openItemId === id;

  return (
    <li className={className}>
      <h3 onClick={() => toggleItem(id)}>{title}</h3>
      <div className={`accordion-item-content ${isOpen ? 'open' : undefined}`}>
        {children}
      </div>
    </li>
  );
}
