import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

const dataImg = {
  id: '1617555636970000',
  ts: 1617555636970000,
  title: 'Doge',
  description: 'The best doge',
  url: 'LOAD_SUCCESS_SRC',
};
type DataImg = typeof dataImg;
type DataRespose = {
  after: number | null;
  data: DataImg[];
};

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = 0 }): Promise<DataRespose> => {
    const { data } = await api.get<DataRespose>(`/api/images`, {
      params: {
        after: pageParam,
      },
    });
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => lastPage.after,
  });

  const formattedData = useMemo(() => {
    const r =
      data?.pages.flatMap(page => {
        return page.data;
      }) || [];
    return r;
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt={8} onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
