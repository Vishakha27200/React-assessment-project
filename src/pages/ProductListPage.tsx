import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import SearchAndFilter from '../components/SearchAndFilter';
import ErrorMessage from '../components/ErrorMessage';

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchData = () => {
    setLoading(true);
    setError(null);

    Promise.all([
      fetch('https://fakestoreapi.com/products').then(res => res.json()),
      fetch('https://fakestoreapi.com/products/categories').then(res => res.json())
    ])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setFiltered(productData);
        setCategories(categoryData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Something went wrong while loading products. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = (term: string, category: string) => {
    let result = [...products];

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (term) {
      const lower = term.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(lower)
      );
    }

    setFiltered(result);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, selectedCategory);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchTerm, category);
  };

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} onRetry={fetchData} />;

  return (
    <div >
      <h1 style={{ textAlign: 'center' }}>Product Catalog</h1>
      <SearchAndFilter
        categories={categories}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />
      <div className="grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
