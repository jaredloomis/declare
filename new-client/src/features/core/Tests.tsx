import React from "react";
import { atom, useAtom } from 'jotai'
import { gql, useQuery } from '@apollo/client';
import { Spinner } from 'flowbite-react';
import { sidebarOpenAtom } from "../store";

const GET_TEST_COLLECTIONS = gql`
  query GetTestCategories {
    categories {
      data {_id parent name items children}
      error
    }
  }
`;

export function Tests() {
  const { loading, error, data } = useQuery(GET_TEST_COLLECTIONS);

  return loading ? <Spinner /> : (
    <div className="w-full">
      <h1 className="text-3xl">Tests</h1>
      <a>{JSON.stringify(data)}</a>
      {/*loading && tests.map(test =>
        <a>{JSON.stringify(test)}</a>
      )*/}
    </div>
  );
}
