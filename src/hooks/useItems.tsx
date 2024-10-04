import { useEffect, useState } from 'react';
import { MockData } from '../lib/types';
import { getMockData } from '../lib/services';

export const useItems = () => {
  const [pageNum, setPageNum] = useState<number>(1);
  const [items, setItems] = useState<MockData[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchItems = async (pageNum: number) => {
    try {
      setIsLoading(true);

      const result = await getMockData(pageNum);

      setItems((prev) => [...prev, ...result.datas]);
      setIsEnd(result.isEnd);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(pageNum);
  }, [pageNum]);

  return {
    isLoading,
    isEnd,
    items,
    setPageNum,
  };
};
