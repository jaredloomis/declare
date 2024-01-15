import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Select, SelectProps } from '../../components/Select';
import { useAuthStore } from '../../authStore';
import { Spinner } from '../../components/Spinner';
import { Modal } from '../../components/Modal';
import { ElementCreate } from './ElementCreate';

const ELEMENTS_QUERY = gql`
  query Elements($accountId: Int!) {
    account(id: $accountId) {
      elements {
        id
        name
        selector
        selectorType
      }
    }
  }
`;

export interface ElementSelectProps extends SelectProps {}

export function ElementSelect({ ...props }: ElementSelectProps) {
  const auth = useAuthStore();
  const elements = useQuery(ELEMENTS_QUERY, {
    variables: { accountId: auth.user?.accountId },
  });
  const [createInProgress, setCreateInProgress] = React.useState<boolean>(false);

  const options = elements.data?.account?.elements?.map((e: any) => ({
    value: e.id,
    label: e.name,
  }));

  if (!options) {
    return <Spinner />;
  }

  return (
    <div>
      <Select creatable options={options} onCreateOption={() => setCreateInProgress(true)} {...props} />
      {createInProgress && (
        <Modal onClose={() => setCreateInProgress(false)}>
          <ElementCreate onSuccess={() => setCreateInProgress(false)}/>
        </Modal>
      )}
    </div>
  );
}
