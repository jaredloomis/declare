import { gql, useMutation, useQuery } from '@apollo/client';
import React, { forwardRef } from 'react';
import { Select, SelectProps } from '../../components/Select';
import { useAuthStore } from '../../authStore';
import { Spinner } from '../../components/Spinner';
import { CREATE_COLLECTION_MUTATION } from './api';

const COLLECTIONS_QUERY = gql`
  query Collections($accountId: Int!) {
    account(id: $accountId) {
      collections {
        id
        name
      }
    }
  }
`;

export interface CollectionSelectProps extends SelectProps {}

export const CollectionSelect = forwardRef(function CollectionSelect({ ...props }: CollectionSelectProps, ref: React.ForwardedRef<any>) {
  const auth = useAuthStore();
  const collections = useQuery(COLLECTIONS_QUERY, {
    variables: { accountId: auth.user?.accountId },
  });
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
