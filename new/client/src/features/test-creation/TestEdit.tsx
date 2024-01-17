import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { Select } from '../../components/Select';
import { Spinner } from '../../components/Spinner';
import { Heading } from '../../components/Heading';
import { TEST_QUERY } from './api';
import { Button } from '../../components/Button';
import { Test, TestStep } from '../../gql/graphql';
import { ElementSelect } from '../element/ElementSelect';
import { CORE_TEST_FIELDS } from './api';
import { TextInput } from '../../components/TextInput';
import { Checkbox } from '../../components/Checkbox';
import { TestSelect } from './TestSelect';
import { Editable } from '../../components/Editable';
import { Modal } from '../../components/Modal';

const TestEditContext = React.createContext<{ test: Test | undefined }>({ test: undefined });

const STEP_FIELDS: Record<string, Record<string, string | [string, string]>> = {
  wait: {
    milliseconds: ['number', 'Time (ms)'],
  },
  goTo: {
    url: ['text', 'URL'],
  },
  click: {
    elementId: 'element',
  },
  sendText: {
    elementId: 'element',
    text: ['text', 'Text'],
  },
  executeJavascript: {
    code: ['text', 'JavaScript code'],
  },
  refresh: {},
  assertExists: {
    elementId: 'element',
    visible: ['boolean', 'Visible'],
  },
  assertText: {
    elementId: 'element',
    text: ['text', 'Text'],
  },
  setVariable: {
    name: ['text', 'Name'],
    value: ['variable', 'Value'],
  },
  importTest: {
    testId: ['test', 'Test'],
  },
};

const FieldEdit = React.forwardRef(function FieldEdit({ type, name, ...props }: any, ref: React.ForwardedRef<any>) {
  const { t } = useTranslation();

  if (type === 'text') {
    return (
      <TextInput
        name={name}
        label={props.label}
        onValueChange={props.onChange}
        onBlur={props.onBlur}
        ref={ref}
        defaultValue={props.defaultValue}
        key={props.key}
      />
    );
  } else if (type === 'number') {
    return (
      <TextInput
        number
        name={name}
        label={props.label}
        onValueChange={props.onChange}
        onBlur={props.onBlur}
        ref={ref}
        defaultValue={props.defaultValue}
        key={props.key}
      />
    );
  } else if (type === 'element') {
    return (
      <ElementSelect
        name={name}
        label={props.label}
        collectionId={props.collectionId}
        defaultValue={props.defaultValue}
        onValueChange={props.onChange}
        key={props.key}
      />
    );
  } else if (type === 'boolean') {
    return (
      <Checkbox
        name={name}
        label={props.label}
        onValueChange={props.onChange}
        onBlur={props.onBlur}
        defaultValue={props.defaultValue}
        key={props.key}
      />
    );
  } else if (type === 'variable') {
    const defaultType = props.defaultValue?.code ? 'code' : props.defaultValue?.elementId ? 'elementId' : 'string';
    const typeOptions = {
      string: t('test.stepType.setVariable-type.text.select-option'),
      code: t('test.stepType.setVariable-type.javascript.select-option'),
      elementId: t('test.stepType.setVariable-type.element.select-option'),
    };
    const [variableType, setVariableType] = useState(defaultType);
    const handleChange = (name: string) => (newValue: string | number) => {
      props.onChange({ string: undefined, code: undefined, elementId: undefined, [name]: newValue });
    };
    const valueInput = {
      string: (
        <TextInput label={t('test.stepType.setVariable-type.text.input-label')} defaultValue={props.defaultValue?.string} onValueChange={handleChange(variableType)} />
      ),
      code: (
        <TextInput
          label={t('test.stepType.setVariable-type.javascript.input-label')}
          defaultValue={props.defaultValue?.code}
          onValueChange={handleChange(variableType)}
        />
      ),
      elementId: (
        <ElementSelect
          label={t('test.stepType.setVariable-type.element.input-label')}
          defaultValue={props.defaultValue?.elementId}
          collectionId={props.collectionId}
          onValueChange={handleChange(variableType)}
        />
      ),
    }[variableType];

    return (
      <div key={props.key}>
        <Select
          label={t('test.stepType.setVariable-type-select-label')}
          defaultValue={defaultType}
          onValueChange={setVariableType}
          options={Object.entries(typeOptions).map(([value, label]) => ({ value, label }))}
        />
        {valueInput}
      </div>
    );
  } else if (type === 'test') {
    return (
      <TestSelect
        label={props.label}
        collectionId={props.collectionId}
        defaultValue={props.defaultValue}
        onValueChange={props.onChange}
        key={props.key}
      />
    );
  } else {
    console.error(`Unknown field type: ${type}`);
    return <span key={name}>Unknown field type: {type}</span>;
  }
});

interface KeyedTestStep extends Omit<TestStep, 'stepType'> {
  key: number;
  stepType: string | undefined;
}

interface StepParamsProps {
  i: number;
  step: KeyedTestStep;
  fields?: Record<string, string | [string, string]>;
  onChange: (step: KeyedTestStep) => void;
  onDelete: () => void;
  onAddAbove: () => void;
}

function TestEditStep({ i, fields, step, onChange, onDelete, onAddAbove }: StepParamsProps) {
  const { t } = useTranslation();
  const stepTypeOptions = Object.keys(STEP_FIELDS).map(k => ({
    value: k,
    label: t(`test.stepType.${k}`),
  }));
  const { test } = useContext(TestEditContext);

  const handleStepChange = (name: string) => (newValue: any) => onChange({ ...step, [name]: newValue });

  const handleTypeChange = (newStepType: string | null) => onChange({ ...step, stepType: newStepType || undefined });

  const fieldElements =
    fields &&
    Object.entries(fields).map(([name, spec]) => {
      const [type, label] = Array.isArray(spec) ? spec : [spec, undefined];
      const props = {
        step,
        type,
        label,
        collectionId: test?.collectionId,
        defaultValue: (step as any)[name],
        key: name,
        onChange: handleStepChange(name),
      };
      return <FieldEdit {...props} />;
    });

  return (
    <div>
      <Button onClick={onAddAbove}>{t('test.add-step-above')}</Button>
      <Button onClick={onDelete}>{t('test.delete-step')}</Button>
      <form>
        <span>#{i + 1}</span>
        <Select options={stepTypeOptions} defaultValue={step.stepType} onValueChange={handleTypeChange} />
        {fieldElements}
      </form>
    </div>
  );
}

const UPDATE_TEST_MUTATION = gql`
  ${CORE_TEST_FIELDS}
  mutation UpdateTest($id: Int!, $test: TestUpdateInput!) {
    updateTest(id: $id, test: $test) {
      ...CoreTestFields
    }
  }
`;

const DELETE_TEST_MUTATION = gql`
  mutation DeleteTest($id: Int!) {
    deleteTest(id: $id)
  }
`;

export interface TestEditProps {
  testId: number;
}

export default function TestEdit({ testId }: TestEditProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>('');
  const [steps, setSteps] = React.useState<KeyedTestStep[]>([]);
  const [deleteInProgress, setDeleteInProgress] = React.useState(false);

  const testRes = useQuery(TEST_QUERY, {
    variables: { id: testId },
  });
  const [updateTestMutation] = useMutation(UPDATE_TEST_MUTATION, {
    variables: { id: testId },
  });
  const [deleteTestMutation] = useMutation(DELETE_TEST_MUTATION, {
    variables: { id: testId },
    refetchQueries: ['Tests', 'Collections'],
  });
  const test = testRes.data?.test;

  const handleChange = (key: number) => (step: KeyedTestStep) => {
    const index = steps.findIndex(s => s.key === key);
    const newSteps = [...steps];
    newSteps[index] = step;
    setSteps(newSteps);
  };

  const handleSave = async () => {
    await updateTestMutation({
      variables: {
        test: {
          name,
          steps: steps.map(step => ({ ...step, key: undefined })),
        },
      },
    });
    navigate(`/test/${testId}`);
  };

  const handleDelete = async () => {
    setDeleteInProgress(false);
    await deleteTestMutation();
    navigate(`/collection/${test.collectionId}`);
  };

  useEffect(() => {
    // Initialize state from query result
    if (testRes.data?.test) {
      setName(test.name);
      // Add key to each step to allow React to track them
      const steps = test.steps.map((step: any) => ({ ...step, key: Math.random() }));
      setSteps(steps);
    } else if (testRes.error) {
      navigate('/404');
    }
  }, [testRes]);

  if (testRes.loading) {
    return <Spinner />;
  }

  return (
    <TestEditContext.Provider value={{ test: testRes?.data?.test }}>
      <div>
        <Heading size='xlarge'>
          <Editable edit={<TextInput defaultValue={name} onValueChange={name => setName(name as string)} />}>{name}</Editable>
        </Heading>
        <Button onClick={handleSave}>{t('test.save')}</Button>
        <Button onClick={() => setDeleteInProgress(true)}>{t('test.delete')}</Button>
      </div>
      <Heading size='large'>{t('test.steps-heading')}</Heading>
      {steps.map((step, i) => (
        <TestEditStep
          key={step.key}
          i={i}
          step={step}
          fields={STEP_FIELDS[step.stepType || '']}
          onChange={handleChange(step.key)}
          onDelete={() => setSteps(steps.filter(s => s.key !== step.key))}
          onAddAbove={() => {
            const newSteps = [...steps];
            newSteps.splice(i, 0, { stepType: undefined, key: Math.random() });
            setSteps(newSteps);
          }}
        />
      ))}
      <Button onClick={() => setSteps([...steps, { stepType: undefined, key: Math.random() }])}>
        {t('test.add-step')}
      </Button>
      {deleteInProgress && (
        <Modal>
          <p>{t('test.delete-confirmation')}</p>
          <Button onClick={() => setDeleteInProgress(false)}>{t('test.delete-cancel')}</Button>
          <Button onClick={handleDelete}>{t('test.delete-confirm')}</Button>
        </Modal>
      )}
    </TestEditContext.Provider>
  );
}
