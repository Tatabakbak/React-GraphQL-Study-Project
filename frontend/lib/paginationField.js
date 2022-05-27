import gql from 'graphql-tag';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // check if there's existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // last page case
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // no items, go to network
        return false;
      }

      if (items.length) {
        // return from cache
        /* console.log(
          `there are ${items.length} items in the cache. sending them to apollo.`
        ); */
        return items;
      }

      return false; // fallback to netork
    },

    merge(existing, incoming, { args }) {
      /* console.log(`merging from network ${incoming.length}`); */
      const { skip, first } = args;
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
