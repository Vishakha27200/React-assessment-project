import { Link } from 'react-router-dom';
import { Product } from '../types/product';

const ProductCard = ({ product }: { product: Product }) => (
  <div className="product-card">
    <Link to={`/product/${product.id}`} className="product-link">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price}</p>
      <p className="product-category">{product.category}</p>
    </Link>
  </div>
);

export default ProductCard;
