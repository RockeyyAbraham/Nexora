import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Product Not Found</h2>

        <Link to="/products">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Back to Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <img
          src={
            product.imageUrl ||
            "https://via.placeholder.com/450x350"
          }
          alt={product.title}
          style={{
            width: "400px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />

        <div style={{ flex: 1 }}>
          <h1>{product.title}</h1>

          <h2 style={{ color: "green" }}>
            ₹ {product.price}
          </h2>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Stock:</strong> {product.stock}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{product.description}</p>

          <button
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() =>
              alert("Add to Cart functionality will be integrated with Cart Module.")
            }
          >
            Add to Cart
          </button>

          <br />

          <Link to="/products">
            <button
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Back to Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;