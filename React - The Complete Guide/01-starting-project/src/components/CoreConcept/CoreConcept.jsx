import './CoreConcept.css';

export default function CoreConcept({ title, description, image } = props) {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>
  );
}
