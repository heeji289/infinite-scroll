import { useItems } from './hooks/useItems';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

function App() {
  const { isLoading, isEnd, items, setPageNum } = useItems();
  const { loadMoreRef } = useInfiniteScroll(isLoading, isEnd, setPageNum);

  return (
    <section>
      {items.map((data) => (
        <div key={data.productId}>
          <h1>{data.productName}</h1>
          <p>{data.price}</p>
          <p>{data.boughtDate}</p>
        </div>
      ))}

      <div ref={loadMoreRef} style={{ height: '50px' }}>
        {isLoading && <p>IsLoading</p>}
        <p>합계: {items.reduce((acc, item) => acc + item.price, 0)}</p>
      </div>
    </section>
  );
}

export default App;
