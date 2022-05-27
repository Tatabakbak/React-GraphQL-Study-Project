import { useRouter } from 'next/dist/client/router';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  // const [pageNum, setPageNum] = useState(1);

  // const handlePageChange = (page) => {
  //   setPageNum(page);
  // };

  return (
    <div>
      <Pagination page={page || 1} /* handlePageChange={handlePageChange} */ />
      <Products page={page || 1} />
      <Pagination page={page || 1} /* handlePageChange={handlePageChange} */ />
    </div>
  );
}
