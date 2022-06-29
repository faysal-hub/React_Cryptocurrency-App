import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': 'd334132cbdmsh498f4e38f1dac60p1b490djsn090f94628bc6',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url, extraParams = {}) => ({
  url,
  headers: cryptoApiHeaders,
  ...extraParams,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) =>
        createRequest(`/coins?limit=${count}`, {
          params: { referenceCurrencyUuid: 'yhjMzLPhuIDl' },
        }),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) =>
        createRequest(`/coin/${coinId}`, {
          params: { referenceCurrencyUuid: 'yhjMzLPhuIDl' },
        }),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history`, {
          params: { timePeriod, referenceCurrencyUuid: 'yhjMzLPhuIDl' },
        }),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
