import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Select, SelectProps } from '../../components/Select';
import { Spinner } from '../../components/Spinner';
import { Modal } from '../../components/Modal';
import { ElementCreate } from './ElementCreate';

const ELEMENTS_QUERY = gql`
  query Elements {
    account {
      elements {
        id
        name
        selector
        selectorType
      }
    }
  }
`;

export interface ElementSelectProps extends SelectProps {
  collectionId?: number;
}

export function ElementSelect({ collectionId, ...props }: ElementSelectProps) {
  const [selectedElement, setSelectedElement] = React.useState<number | undefined>(undefined);
  const [searchText, setSearchText] = React.useState<string | undefined>('');
  const elements = useQuery(ELEMENTS_QUERY);
  const [createInProgress, setCreateInProgress] = React.useState<boolean>(false);

  const options = elements.data?.account?.elements?.map((e: any) => ({
    value: e.id,
    label: e.name,
  }));

  const defaultValues = {
    name: searchText,
    selector: searchText,
    collectionId: collectionId,
  };

  const handleCreateBegin = (input: string) => {
    setCreateInProgress(true);
    setSearchText(input);
  };

  const handleCreateSuccess = (element: any) => {
    setCreateInProgress(false);
    setSearchText('');
    setSelectedElement(element.id);
    elements.refetch();
  };

  if (!options) {
    return <Spinner />;
  }

  return (
    <div>
      <Select
        creatable
        options={options}
        onCreateOption={handleCreateBegin}
        value={selectedElement}
        onValueChange={setSelectedElement}
        {...props}
      />
      {createInProgress && (
        <Modal onClose={() => setCreateInProgress(false)}>
          <ElementCreate defaultValues={defaultValues} onSuccess={handleCreateSuccess} />
        </Modal>
      )}
    </div>
  );
}
