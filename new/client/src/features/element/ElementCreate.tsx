import React from 'react';
import { TextInput } from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { gql, useMutation } from '@apollo/client';
import { CollectionSelect } from '../test-creation/CollectionSelect';
import { selectorType } from './api';

const CREATE_ELEMENT_MUTATION = gql`
  mutation CreateElement($element: ElementCreateInput!) {
    createElement(element: $element) {
      id
      name
    }
  }
`;

interface ElementCreateProps {
  onSuccess?: () => void;
}

export function ElementCreate({ onSuccess }: ElementCreateProps) {
  const { register, handleSubmit, control } = useForm();
  const [createElementMutation] = useMutation(CREATE_ELEMENT_MUTATION);

  const submit = async (element: any) => {
    element.collectionId = element.collection.value;
    element.collection = undefined;
    element.selectorType = element.selectorType.value;
    await createElementMutation({ variables: { element } });
    onSuccess && onSuccess();
  };

  const selectorTypeOptions = Object.values(selectorType).map((v) => ({ value: v, label: v }));

  return (
    <form onSubmit={handleSubmit(submit)}>
      <CollectionSelect {...register('collection')} control={control} label='Collection' />
      <TextInput {...register('name')} label='Name' />
      <Select {...register('selectorType')} control={control} options={selectorTypeOptions} label='Selector Type' />
      <TextInput {...register('selector')} label='Selector' />
      <Button type='submit'>Create Element</Button>
    </form>
  );
}
