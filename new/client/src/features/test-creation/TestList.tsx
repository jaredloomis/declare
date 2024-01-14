import React, { useState } from 'react';
import { gql, useQuery, useMutation, useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Collection, User } from '../../gql/graphql';
import { Table } from '../../components/Table';
import { Spinner } from '../../components/Spinner';
import { Card } from '../../components/Card';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../authStore';
import { CREATE_COLLECTION_MUTATION } from './api';

const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($accountId: Int!) {
    account(id: $accountId) {
      collections {
        id
        name
        tests {
          id
          name
        }
      }
    }
  }
`;

interface TestCollectionProps {
  collection: Collection;
}

function TestCollection({ collection }: TestCollectionProps) {
  const apollo = useApolloClient();
  const [testName, setTestName] = useState<string>('');
  const handleCreateTest = () => {
    apollo.mutate({
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
      refetchQueries: ['GetCollections'],
    });
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

export function TestList() {
  const [name, setName] = useState<string>();
  const auth = useAuthStore();
  const collectionsRes = useQuery(GET_COLLECTIONS_QUERY, {
    variables: {
      accountId: auth.user?.accountId,
    },
  });
  const [createCollection] = useMutation(CREATE_COLLECTION_MUTATION, {
    refetchQueries: ['GetCollections'],
  });
  const handleCreateCollection = (event: any) => {
    event.preventDefault();
    createCollection({ variables: { collection: { name } } });
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
            <TextInput label='Collection Name' onValueChange={setName} />
            <Button color='success' size='large'>
              Create Collection
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}
