import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Select } from "../../components/Select";
import { Spinner } from "../../components/Spinner";
import { Heading } from "../../components/Heading";
import { TEST_QUERY, testStepDescription } from "./api";
import { Button } from "../../components/Button";
import { ClickStep, Maybe, Test, TestStep } from "../../gql/graphql";
import { ElementSelect } from "../../components/ElementSelect";

const objectMap = (obj: any, fn: any) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  );

interface KeyedTestStep extends Omit<TestStep, 'stepType'> {
  key: number;
  stepType: string | undefined;
}

interface TestEditStepProps {
  step: KeyedTestStep;
  i: number;
  onChange?: (step: KeyedTestStep) => void;
}

const STEP_ARGUMENTS: Record<string, [any, string]> = {
  click: [ClickStepEdit, "Click"],
};

function TestEditStep({ i, onChange, ...props }: TestEditStepProps) {
  const [step, setStep] = React.useState<KeyedTestStep>(props.step);
  const options = Object.values(objectMap(STEP_ARGUMENTS, (v: any, k: any) => ({
    value: k, label: v[1]
  })));

  useEffect(() => {
    if(step && onChange) {
      onChange(step)
    }
  }, [step]);

  const argsElement = step.stepType && {
    click: <ClickStepEdit step={step} onChange={newStep => setStep({...step, ...newStep})} />,
  }[step.stepType];

  const handleTypeChange = (newStepType: string | null) => setStep({ ...step, stepType: newStepType || undefined });

  return (
    <div key={step.key}>
      <span>#{i+1}</span>
      <Select options={options} defaultValue={step.stepType} onChange={handleTypeChange} />
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
  const handleChange = (elementId: number) =>
    onChange({ ...step, elementId } as unknown as KeyedTestStep);

  return (
    <>
      <ElementSelect defaultValue={clickStep.elementId} onChange={handleChange} />
    </>
  );
}

export interface TestEditProps {
  testId: number;
}

const UPDATE_TEST_MUTATION = gql`
mutation UpdateTest($id: Int!, $name: String!, $steps: [JSON!]!) {
  updateTest(id: $id, name: $name, steps: $steps) {
    id
  }
}`;

export function TestEdit({ testId }: TestEditProps) {
  const [name, setName] = React.useState<string>("");
  const [steps, setSteps] = React.useState<KeyedTestStep[]>([]);
  const testRes = useQuery(TEST_QUERY, {
    variables: { id: testId },
  });
  const [updateTestMutation, updateTestRes] = useMutation(UPDATE_TEST_MUTATION, {
    variables: { id: testId, name, steps },
  });
  
  // Initialize state from query result
  useEffect(() => {
    if(testRes.data?.test) {
      setName(testRes.data.test.name);
      // Add key to each step to allow React to track them
      setSteps(testRes.data.test.steps.map((step: any) => ({ ...step, key: Math.random() })));
    }
  }, [testRes.data])

  if(testRes.loading) {
    return <Spinner />;
  }

  const handleChange = (key: number) => (step: KeyedTestStep) => {
    const index = steps.findIndex(s => s.key === key);
    const newSteps = [...steps];
    newSteps[index] = step;
    setSteps(newSteps);
  };

  const handleSave = () => {
    updateTestMutation();
  };

  return (<>
    <div>
      <Heading size='xlarge'>{name}</Heading>
      <Button onClick={handleSave}>Save</Button>
    </div>
    <Heading size='large'>Steps</Heading>
    {steps.map((step: any, i) => <TestEditStep step={step} i={i} key={step.key} onChange={handleChange(step.key)} />)}
    <Button onClick={() => setSteps([...steps, { stepType: undefined, key: Math.random() }])}>Add Step</Button>
  </>);
}
