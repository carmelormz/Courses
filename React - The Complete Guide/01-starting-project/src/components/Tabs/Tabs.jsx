export default function Tabs({ children, buttons, Container = 'menu' }) {
  // Other way to set tag types -> const Container = container;
  // Built-in HTML elements need to have lowercase (ie. 'menu')
  // Custom components need to be passed in Capital letter (ie. MyComponent)

  return (
    <>
      <Container>{buttons}</Container>
      {children}
    </>
  );
}
