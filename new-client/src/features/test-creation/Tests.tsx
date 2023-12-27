import React, { useState } from "react";
import { atom, useAtom } from "jotai";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Spinner, Table, Button, TextInput, Card } from "flowbite-react";

const GET_TEST_COLLECTIONS = gql`
  query GetTestCategories {
    categories {
      data {
        _id
        parent
        name
        items
        children
      }
      error
    }
  }
`;

const GET_PAGE = gql`
  query GetPage($id: String!) {
    page(id: $id) {
      data {
        _id
        name
        startURL
        customTests
      }
      error
    }
  }
`;

const GET_CUSTOM_TEST = gql`
  query GetCustomTest($id: ID!) {
    customTest(id: $id) {
      data {
        _id
        name
      }
      error
    }
  }
`;

const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollection($category: CategoryInput!) {
    createCategory(category: $category) {
      data {
        _id
        name
      }
      error
    }
  }
`;

function TestList({ testIDs }) {
  const testQueries = testIDs.map((testID) =>
    useQuery(GET_CUSTOM_TEST, { variables: { id: testID } }),
  );
  return (
    <ul>
      {testQueries.map(
        (tq) =>
          tq?.data?.customTest?.data && (
            <Table.Row>
              <Table.Cell>
                <Link to={`/test/${tq?.data?.customTest?.data?._id}`}>
                  {tq?.data?.customTest?.data?.name}
                </Link>
              </Table.Cell>
            </Table.Row>
          ),
      )}
    </ul>
  );
}

function TestCollection({ category }) {
  const pageQueries: { [key: string]: any } = {};
  for (const pageID of category.items) {
    pageQueries[pageID] = useQuery(GET_PAGE, { variables: { id: pageID } });
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-4">{category.name}</h2>
      <Table>
        <Table.Head>
          <Table.HeadCell>Test Name</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {category.items.map(
            (pageID) =>
              pageQueries[pageID]?.data?.page?.data?.customTests && (
                <TestList
                  testIDs={pageQueries[pageID]?.data?.page?.data?.customTests}
                />
              ),
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export function Tests() {
  const [name, setName] = useState<string>();
  const collectionsResult = useQuery(GET_TEST_COLLECTIONS);
  const [createCollection, creationResult] = useMutation(CREATE_COLLECTION_MUTATION);
  const handleCreateCollection = (event) => {
    event.preventDefault();
    createCollection({ variables: { category: { parent: null, name, items: [], itemRef: "page" } } });
  };

  if(collectionsResult.data && creationResult.data) {
  }

  return collectionsResult.loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="text-3xl pb-10">Tests</h1>
      {collectionsResult.data.categories.data.map((category) => (
        <TestCollection category={category} />
      ))}
      <Card className="fixed top-24 right-10">
      <form onSubmit={handleCreateCollection}>
        <TextInput placeholder="Collection Name" onChange={ev => setName(ev.target.value)}/>
        <Button color="success" size="large" type="submit">
          Create Collection
        </Button>
      </form>
      </Card>
    </div>
  );
}
