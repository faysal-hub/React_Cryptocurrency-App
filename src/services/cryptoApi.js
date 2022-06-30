import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_API_HOST,
};

const baseUrl = `https://${process.env.REACT_APP_CRYPTO_API_HOST}`;

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
