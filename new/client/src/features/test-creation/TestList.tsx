import React, { useState } from 'react';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';

import { Collection } from '../../gql/graphql';
import { Table } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Card } from '../../components/Card';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { COLLECTIONS_QUERY, CREATE_COLLECTION_MUTATION } from './api';

interface TestCollectionProps {
  collection: Collection;
}

function TestCollection({ collection }: TestCollectionProps) {
  const apollo = useApolloClient();
  const [testName, setTestName] = useState<string>('');
  const handleCreateTest = async () => {
    await apollo.mutate({
      mutation: gql`
        mutation CreateTest($test: TestCreateInput!) {
          createTest(test: $test) {
            id
            name
          }
        }
      `,
      variables: {
        test: {
          collectionId: collection.id,
          name: testName,
          steps: [],
        },
      },
      refetchQueries: ['Collections'],
    });
    setTestName('');
  };

  return (
    <div className='mb-8'>
      <h2 className='text-2xl mb-4'>{collection.name}</h2>
      <Table columns={['Test Name']}>
        {collection.tests.map(test => (
          <Table.Row key={test.id}>
            <Table.Cell>
              <Link to={`/test/${test.id}`}>{test.name}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>

      <TextInput label='Test Name' onValueChange={setTestName} />
      <Button color='success' size='large' onClick={handleCreateTest}>
        Create Test
      </Button>
    </div>
  );
}

export default function TestList() {
  const [name, setName] = useState<string>('');
  const collectionsRes = useQuery(COLLECTIONS_QUERY);
  const [createCollection] = useMutation(CREATE_COLLECTION_MUTATION, {
    refetchQueries: ['Collections'],
  });
  const handleCreateCollection = (event: any) => {
    event.preventDefault();
    createCollection({ variables: { collection: { name } } });
    setName('');
  };

  if (collectionsRes.loading) {
    return <Spinner />;
  }

  if (collectionsRes.error) {
    return <span>Error: {collectionsRes.error.message}</span>;
  }

  return (
    <>
      <h1 className='text-3xl pb-10'>Tests</h1>
      {collectionsRes.data.account.collections.map((collection: Collection) => (
        <TestCollection collection={collection} key={collection.id} />
      ))}
      <div>
        <Card>
          <form onSubmit={handleCreateCollection}>
            <TextInput label='Collection Name' value={name} onValueChange={setName} />
            <Button color='success' size='large'>
              Create Collection
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
