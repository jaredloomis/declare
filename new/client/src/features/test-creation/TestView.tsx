import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Spinner } from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { Table } from '../../components/Table';
import { Heading } from '../../components/Heading';
import { TEST_QUERY, testStepDescription } from './api';
import { TestStep } from '../../gql/graphql';
import { Button } from '../../components/Button';

interface TestStepProps {
  step: TestStep;
  i: number;
}

function TestStep({ step, i }: TestStepProps) {
  return (
    <div key={i}>
      <span>#{i + 1}</span>
      <p>{testStepDescription(step)}</p>
    </div>
  );
}

export interface TestProps {
  testId: number;
}

export default function TestView({ testId }: TestProps) {
  const testRes = useQuery(TEST_QUERY, {
    variables: { id: testId },
  });

  if (testRes.loading) {
    return <Spinner />;
  }

  const test = testRes.data?.test;

  return (
    <>
      <div>
        <Heading size='xlarge'>{test?.name}</Heading>
        <Button to={`/test/${testId}/edit`}>Edit</Button>
      </div>
      <Heading size='large'>Steps</Heading>
      {test?.steps?.map((step: any, i: number) => <TestStep step={step} i={i} />)}
      <Heading size='large'>Reports</Heading>
      <Table columns={['Start Time']}>
        {test?.reports.map((report: any) => (
          <Table.Row>
            <Table.Cell>
              <Link key={report.id} to={`/report/${report.id}`}>
                {report.startTime}
              </Link>
            </Table.Cell>
            <Table.Cell>{report.startTime}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </>
  );
}

//export default TestView;
