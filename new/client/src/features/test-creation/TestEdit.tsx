import { gql, useMutation, useQuery } from '@apollo/client';
import React, { ReactNode, useEffect } from 'react';
import { Select } from '../../components/Select';
import { Spinner } from '../../components/Spinner';
import { Heading } from '../../components/Heading';
import { TEST_QUERY } from './api';
import { Button } from '../../components/Button';
import { ClickStep, TestStep } from '../../gql/graphql';
import { ElementSelect } from '../element/ElementSelect';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CORE_TEST_FIELDS } from './api';

const objectMap = (obj: any, fn: any) => Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

interface KeyedTestStep extends Omit<TestStep, 'stepType'> {
  key: number;
  stepType: string | undefined;
}

interface TestEditStepProps {
  step: KeyedTestStep;
  i: number;
  onChange?: (step: KeyedTestStep) => void;
}

const STEP_ARGUMENTS: Record<string, (props: any) => ReactNode> = {
  click: ClickStepEdit,
};

function TestEditStep({ i, onChange, ...props }: TestEditStepProps) {
  const { t } = useTranslation();
  const [step, setStep] = React.useState<KeyedTestStep>(props.step);
  const options = Object.values(
    objectMap(STEP_ARGUMENTS, (v: any, k: any) => ({
      value: k,
      label: t(`test.stepType.${k}`),
    }))
  );

  useEffect(() => {
    if (step && onChange) {
      onChange(step);
    }
  }, [step]);

  const argsElement =
    step.stepType &&
    {
      click: <ClickStepEdit step={step} onChange={newStep => setStep({ ...step, ...newStep })} />,
    }[step.stepType];

  const handleTypeChange = (newStepType: string | null) => setStep({ ...step, stepType: newStepType || undefined });

  return (
    <div key={step.key}>
      <span>#{i + 1}</span>
      <Select options={options} defaultValue={step.stepType} onValueChange={handleTypeChange} />
      {argsElement}
    </div>
  );
}

interface StepComponentProps {
  step: KeyedTestStep;
  onChange: (step: KeyedTestStep) => void;
}

interface ClickStepEditProps extends StepComponentProps {
  step: KeyedTestStep;
}

function ClickStepEdit({ step, onChange }: ClickStepEditProps) {
  const clickStep = step as unknown as ClickStep;
  const handleChange = (elementId: number) => onChange({ ...step, elementId } as unknown as KeyedTestStep);

  return (
    <>
      <ElementSelect defaultValue={clickStep.elementId} onValueChange={handleChange} />
    </>
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

export interface TestEditProps {
  testId: number;
}

export function TestEdit({ testId }: TestEditProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>('');
  const [steps, setSteps] = React.useState<KeyedTestStep[]>([]);
  const testRes = useQuery(TEST_QUERY, {
    variables: { id: testId },
  });
  const [updateTestMutation, updateTestRes] = useMutation(UPDATE_TEST_MUTATION, {
    variables: { id: testId, name, steps },
  });

  // Initialize state from query result
  useEffect(() => {
    if (testRes.data?.test) {
      setName(testRes.data.test.name);
      // Add key to each step to allow React to track them
      setSteps(
        testRes.data.test.steps.map((step: any) => ({
          ...step,
          key: Math.random(),
        }))
      );
    }
  }, [testRes.data]);

  if (testRes.loading) {
    return <Spinner />;
  }

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

  return (
    <>
      <div>
        <Heading size='xlarge'>{name}</Heading>
        <Button onClick={handleSave}>{t('test.edit.save-test')}</Button>
      </div>
      <Heading size='large'>{t('test.edit.test-steps-heading')}</Heading>
      {steps.map((step: any, i) => (
        <TestEditStep step={step} i={i} key={step.key} onChange={handleChange(step.key)} />
      ))}
      <Button onClick={() => setSteps([...steps, { stepType: undefined, key: Math.random() }])}>
        {t('test.edit.add-step')}
      </Button>
    </>
  );
}
