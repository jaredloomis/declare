import { useQuery } from '@apollo/client';
import React from 'react';
import { Select, SelectProps } from '../../components/Select';
import { Spinner } from '../../components/Spinner';
import { TESTS_QUERY } from './api';

export interface TestSelectProps extends SelectProps {
  collectionId?: number;
}

export function TestSelect({ collectionId, ...props }: TestSelectProps) {
  const [selectedTest, setSelectedTest] = React.useState<number | undefined>(undefined);
  const tests = useQuery(TESTS_QUERY);

  const options = tests.data?.account?.tests?.map((e: any) => ({
    value: e.id,
    label: e.name,
  }));

  if (!options) {
    return <Spinner />;
  }

  return (
    <div>
      <Select options={options} value={selectedTest} onValueChange={setSelectedTest} {...props} />
    </div>
  );
}
