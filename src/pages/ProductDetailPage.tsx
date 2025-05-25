import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Product } from '../types/product';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = () => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  
  if (error) return <ErrorMessage message={error} onRetry={fetchProduct} />;

  if (!product) return <p className="pdp-not-found">Product not found.</p>;

  return (
    <div className="pdp-container">
      <button className="pdp-back-button" onClick={() => navigate(-1)}>← Back to Products</button>
      <div className="pdp-card">
        <div className="pdp-image-wrapper">
          <img src={product.image} alt={product.title} className="pdp-image" />
        </div>
        <div className="pdp-info">
          <h2 className="pdp-title">{product.title}</h2>
          <h3 className="pdp-price">${product.price}</h3>
          <p className="pdp-category"><strong>Category:</strong> {product.category}</p>
          <p className="pdp-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
