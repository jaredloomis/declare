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
  const [createElementMutation] = useMutation(CREATE_ELEMENT_MUTATION);
  const [element, setElement] = React.useState<any>(defaultValues);
  const setField = (field: string) => (value: any) => setElement({ ...element, [field]: value });

  const submit = async () => {
    const res = await createElementMutation({ variables: { element } });
    if (res?.data?.createElement) {
      element.id = res.data.createElement.id;
      onSuccess && onSuccess(element);
    }
  };

  const selectorTypeOptions = Object.values(selectorType).map(v => ({ value: v, label: v }));

  return (
    <div>
      <CollectionSelect
        onValueChange={setField('collectionId')}
        defaultValue={defaultValues?.collectionId}
        label='Collection'
      />
      <TextInput onValueChange={setField('name')} defaultValue={defaultValues.name} label='Name' />
      <Select onValueChange={setField('selectorType')} defaultValue={defaultValues.selectorType} options={selectorTypeOptions} label='Selector Type' />
      <TextInput onValueChange={setField('selector')} defaultValue={defaultValues.selector} label='Selector' />
      <Button onClick={submit}>{t('element.create')}</Button>
    </div>
  );
}
