import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Error404 from '../page/error404/error404';
import axiosToken from '../../context/axiosToken';

const AdminDetailProduct = () => {
  const API = process.env.REACT_APP_API_URL_ADMIN
  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError404, setIsError404] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  console.log(slug)
  useEffect(() => {
    const fetchDetailProducts = async () => {
      try {
        const res = await axiosToken.get(`${API}/products/detail/${slug}`);
        console.log("res: ", res)
        if (res.data.product != []) {
          const product = res.data.product
          setProductDetail(product);
        }
      }
      catch (error) {
        console.error("Fetch error:", error); // Hiển thị lỗi fetch
        console.error("Fetch error:", error.message); // Hiển thị lỗi fetch
        setError(error.message); // Cập nhật lỗi
      } finally {
        setLoading(false); // Đặt trạng thái tải xong
      }
    };

    fetchDetailProducts();
  }, []);

  if (isError404) {
    return <Error404 />; // Render Error 404 page without navigating
  }

  return (
    <div>
      <h1>Thông tin sản phẩm: </h1>
      {productDetail ? (
        <div>
          <p><b>Tiêu đề:</b> {productDetail.title}</p>
          <p><b>Mô tả:</b> {productDetail.description}</p>
          <p><b>Số lượng:</b> {productDetail.stock}</p>
          <p><b>Giá:</b> {productDetail.price}đ</p>
          <p><b>Giảm:</b> {productDetail.discountPercentage}%</p>
          <img src={productDetail.thumbnail} />
        </div>)

        : "Không tồn tại sản phẩm này"}

    </div>
  );
};

export default AdminDetailProduct;
