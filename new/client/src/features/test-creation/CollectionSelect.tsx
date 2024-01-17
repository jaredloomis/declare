import { gql, useMutation, useQuery } from '@apollo/client';
import React, { forwardRef } from 'react';
import { Select, SelectProps } from '../../components/Select';
import { Spinner } from '../../components/Spinner';
import { COLLECTIONS_QUERY, CREATE_COLLECTION_MUTATION } from './api';

export interface CollectionSelectProps extends SelectProps {}

export const CollectionSelect = forwardRef(function CollectionSelect(
  { ...props }: CollectionSelectProps,
  ref: React.ForwardedRef<any>
) {
  const collections = useQuery(COLLECTIONS_QUERY);
  const [createCollectionMutation] = useMutation(CREATE_COLLECTION_MUTATION);

  const options = collections.data?.account?.collections?.map((e: any) => ({
    value: e.id,
    label: e.name,
  }));

  const handleCreate = async (inputValue: string) => {
    createCollectionMutation({
      variables: {
        collection: {
          name: inputValue,
        },
      },
    });
  };

  if (!options) {
    return <Spinner />;
  }

  return <Select creatable options={options} onCreateOption={handleCreate} ref={ref} {...props} />;
});
