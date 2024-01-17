import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Select, SelectProps } from '../../components/Select';
import { Spinner } from '../../components/Spinner';
import { Modal } from '../../components/Modal';
import { ElementCreate } from './ElementCreate';

const ELEMENTS_QUERY = gql`
  query Elements {
    account {
      id
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

export function ElementSelect({ collectionId, onValueChange, onChange, ...props }: ElementSelectProps) {
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

  const handleChange = (option: any, meta: any) => {
    const value = option.value;
    setSelectedElement(value);
    onValueChange && onValueChange(value);
    onChange && onChange(option, meta);
  };

  const handleCreateBegin = (input: string) => {
    setCreateInProgress(true);
    setSearchText(input);
  };

  const handleCreateSuccess = (element: any) => {
    elements.refetch();
    setCreateInProgress(false);
    setSearchText('');
    setSelectedElement(element.id);
    onValueChange && onValueChange(element.id);
    onChange && onChange({ value: element.id, label: element.name }, undefined);
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
        onChange={handleChange}
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
