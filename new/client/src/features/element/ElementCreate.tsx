import React from 'react';
import { TextInput } from '../../components/TextInput';
import { Controller, useForm } from 'react-hook-form';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { gql, useMutation } from '@apollo/client';
import { CollectionSelect } from '../test-creation/CollectionSelect';

const CREATE_ELEMENT_MUTATION = gql`
  mutation CreateElement($element: ElementCreateInput!) {
    createElement(element: $element) {
      id
      name
    }
  }
`;

interface ElementCreateProps {}

export function ElementCreate({}: ElementCreateProps) {
  const { register, handleSubmit, control } = useForm();
  const [createElementMutation] = useMutation(CREATE_ELEMENT_MUTATION);

  const submit = async (element: any) => {
    console.log(element);
    await createElementMutation({ variables: { element } });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <CollectionSelect {...register('collection')} label='Collection' />
      <TextInput {...register('name')} label='Name' />
      <Select {...register('selectorType')} label='Selector Type' />
      <TextInput {...register('selector')} label='Selector' />
      <Button type='submit'>Create Element</Button>
    </form>
  );
}
