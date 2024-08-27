export default function TabButton({ onClick, children, isActive }) {
  return (
    <li>
      <button className={isActive ? "active" : ""} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
