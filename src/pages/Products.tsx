import ProductCard from '@/components/ProductCard';
import { useGetAllProductsQuery } from '@/redux/features/productApi';
import { getAllProducts } from '@/redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { useEffect } from 'react';
import { useActionData } from 'react-router-dom';

export default function Products() {
  // const {data:products ,isLoading } = useGetAllProductsQuery(undefined);
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.products);
  // console.log(products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  if (loading) {
    return <h1> Loading ...... </h1>;
  }
  return (
    <div className="flex items-center flex-wrap space-x-5 max-w-7xl mx-auto relative ">
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {products?.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
