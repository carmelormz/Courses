import { use } from 'react';
import { useAccordionContext } from './Accordion';

export default function AccordionItem({ id, className, title, children }) {
  const { openItemId, openItem, closeItem } = useAccordionContext();

  const isOpen = openItemId === id;

  const handleClick = () => {
    if (isOpen) {
      closeItem();
    } else {
      openItem(id);
    }
  };

  return (
    <li className={className}>
      <h3 onClick={handleClick}>{title}</h3>
      <div className={`accordion-item-content ${isOpen ? 'open' : undefined}`}>
        {children}
      </div>
    </li>
  );
}
