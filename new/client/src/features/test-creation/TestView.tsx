import { gql, useQuery } from "@apollo/client";
import React from "react";

export interface TestProps {
  testId: number;
}

export function Test({testId}: TestProps) {
  const test = useQuery(gql`
    query {
      test(id: $id) {
        id name steps
      }`)
  return <span>Test</span>;
}