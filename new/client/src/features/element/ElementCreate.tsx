import React from 'react';
import { TextInput } from '../../components/TextInput';
import { useForm } from 'react-hook-form';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { gql, useMutation } from '@apollo/client';
import { CollectionSelect } from '../test-creation/CollectionSelect';
import { selectorType } from './api';
import { useTranslation } from 'react-i18next';

const CREATE_ELEMENT_MUTATION = gql`
  mutation CreateElement($element: ElementCreateInput!) {
    createElement(element: $element) {
      id
      name
    }
  }
`;

interface ElementCreateProps {
  defaultValues?: {
    collectionId?: number;
    name?: string;
    selector?: string;
    selectorType?: string;
  };
  onSuccess?: (element: Element) => void;
}

export function ElementCreate({ defaultValues, onSuccess }: ElementCreateProps) {
  defaultValues = defaultValues || {};
  defaultValues.selectorType = defaultValues?.selectorType || selectorType.CSS;
  const { t } = useTranslation();
  const { register, handleSubmit, control } = useForm({ defaultValues });
  const [createElementMutation] = useMutation(CREATE_ELEMENT_MUTATION);

  const submit = async (element: any) => {
    element.collectionId = element.collectionId.value;
    //element.collection = undefined;
    element.selectorType = element.selectorType.value;
    const res = await createElementMutation({ variables: { element } });
    if (res?.data?.createElement) {
      element.id = res.data.createElement.id;
      onSuccess && onSuccess(element);
    }
  };

  const selectorTypeOptions = Object.values(selectorType).map(v => ({ value: v, label: v }));

  return (
    <form onSubmit={handleSubmit(submit)}>
      <CollectionSelect
        {...register('collectionId')}
        defaultValue={defaultValues?.collectionId}
        control={control}
        label='Collection'
      />
      <TextInput {...register('name')} label='Name' />
      <Select {...register('selectorType')} control={control} options={selectorTypeOptions} label='Selector Type' />
      <TextInput {...register('selector')} label='Selector' />
      <Button type='submit'>{t('element.create')}</Button>
    </form>
  );
}
