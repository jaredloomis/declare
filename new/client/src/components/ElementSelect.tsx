import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Select, SelectProps } from './Select';
import { useAuthStore } from "../authStore";
import { Spinner } from "./Spinner";

const ELEMENTS_QUERY = gql`
  query Elements($accountId: Int!) {
    account(id: $accountId) {
      elements {
        id name selector selectorType
      }
    }
  }`;

export interface ElementSelectProps extends Omit<SelectProps, 'onChange'> {
  onChange: (elementId: number) => void;
}

export function ElementSelect({ onChange, ...props }: ElementSelectProps) {
  const auth = useAuthStore();
  const elements = useQuery(ELEMENTS_QUERY, {
    variables: { accountId: auth.user?.accountId },
  });

  const options = elements.data?.account?.elements?.map((e: any) => ({
    value: e.id,
    label: e.name,
  }));

  if(!options) {
    return <Spinner />;
  }

  return (
    <Select options={options} onChange={onChange} {...props} />
  );
}