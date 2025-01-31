import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>Showing details of product with id: {id}</p>
    </>
  );
}
