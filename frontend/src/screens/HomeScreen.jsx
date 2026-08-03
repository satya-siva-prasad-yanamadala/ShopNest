import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetProductsQuery, useGetFiltersQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const sort = searchParams.get('sort') || '';

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    category,
    brand,
    sort
  });

  const { data: filters, isLoading: loadingFilters } = useGetFiltersQuery();

  const handleFilterChange = (type, value) => {
    if (value) {
      searchParams.set(type, value);
    } else {
      searchParams.delete(type);
    }
    // Maintain keyword if it exists, otherwise use base path
    const path = keyword ? `/search/${keyword}` : '/';
    navigate(`${path}?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    navigate('/');
  };

  return (
    <>
      {!keyword && !category && !brand ? (
        <ProductCarousel />
      ) : (
        <Button onClick={clearFilters} className='btn btn-light mb-4'>
          Clear Filters / Go Back
        </Button>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Row>
            {/* Sidebar for filters */}
            <Col md={3}>
              <h4>Sort By</h4>
              <Form.Select 
                value={sort} 
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="mb-4"
              >
                <option value="">Newest</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Customer Reviews</option>
              </Form.Select>

              <h4>Categories</h4>
              {loadingFilters ? <Loader /> : (
                <ListGroup className="mb-4">
                  <ListGroup.Item 
                    active={category === ''}
                    onClick={() => handleFilterChange('category', '')}
                    style={{ cursor: 'pointer' }}
                  >
                    All Categories
                  </ListGroup.Item>
                  {filters?.categories?.map(c => (
                    <ListGroup.Item 
                      key={c}
                      active={category === c}
                      onClick={() => handleFilterChange('category', c)}
                      style={{ cursor: 'pointer' }}
                    >
                      {c}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}

              <h4>Brands</h4>
              {loadingFilters ? <Loader /> : (
                <ListGroup className="mb-4">
                  <ListGroup.Item 
                    active={brand === ''}
                    onClick={() => handleFilterChange('brand', '')}
                    style={{ cursor: 'pointer' }}
                  >
                    All Brands
                  </ListGroup.Item>
                  {filters?.brands?.map(b => (
                    <ListGroup.Item 
                      key={b}
                      active={brand === b}
                      onClick={() => handleFilterChange('brand', b)}
                      style={{ cursor: 'pointer' }}
                    >
                      {b}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>

            {/* Product Grid */}
            <Col md={9}>
              <h1>Latest Products</h1>
              {data.products.length === 0 && <Message>No products found matching your filters.</Message>}
              <Row>
                {data.products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
