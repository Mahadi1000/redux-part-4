
import { addProduct, createProduct } from '@/redux/features/productSlice';
import { useAppDispatch } from '@/redux/hook';
import { SubmitHandler, useForm } from 'react-hook-form';

 export interface IFormInput {
  name: string;
  image: string;
  price: number;
  features: string[];
  rating: number;
  status: boolean;
}

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  // const [postProduct, { isLoading, isError }] = usePostProductMutation();
  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const newProduct = {
      ...data,
      features: data.features.split(','),
    };

    try {
      // const result = await postProduct(newProduct).unwrap();
     const result = dispatch(createProduct(newProduct));
      console.log('Product added successfully:', result);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-5">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            id="name"
            {...register('name', { required: 'Product Name is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            id="image"
            {...register('image', { required: 'Image URL is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.image && (
            <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register('price', { required: 'Price is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="features"
            className="block text-sm font-medium text-gray-700"
          >
            Features (comma separated)
          </label>
          <textarea
            id="features"
            {...register('features', { required: 'Features are required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.features && (
            <p className="text-red-500 text-xs mt-1">
              {errors.features.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            id="rating"
            type="number"
            {...register('rating', { required: 'Rating is required' })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
