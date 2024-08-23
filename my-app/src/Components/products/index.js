import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addToCart } from '../../features/products/index';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                dispatch(setProducts(data));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [dispatch]);

    const handleAdd = (product) => {
        dispatch(addToCart(product));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4">
            <h2 className='text-center'>Products</h2>
            <div className="row mt-5">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">${product.price}</p>
                                <button className="btn btn-primary" onClick={() => handleAdd(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
