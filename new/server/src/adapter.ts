/**
 * This module provides utilities for converting between the database schema
 * and the GraphQL schema.
 */

export const invConvertObj = (obj: any, adapter: DatabaseToAPIAdapter) => {
  const newObj: any = {};
  Object.entries(obj).forEach(([key, value]: [string, any]) => {
    const entry: [string, any] | undefined = Object.entries(
      adapter.identifierMap,
    ).find(([k, v]: [string, any]) => v === key || v.name === key);
    if (entry) {
      if (entry[1].adapter) {
        newObj[entry[0]] = invConvertObj(value, entry[1].adapter);
      } else {
        newObj[entry[0]] = value;
      }
    } else {
      newObj[key] = value;
    }
  });
  return newObj;
};

export function convertObj(obj: any, adapter: DatabaseToAPIAdapter) {
  const newObj: any = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach(key => {
    const newKey = adapter.identifierMap[key] || key;
    if (typeof newKey === "object" && newKey.adapter) {
      if (Array.isArray(obj[key])) {
        newObj[newKey.name] = obj[key].map((o: any) =>
          convertObj(o, newKey.adapter),
        );
      } else {
        newObj[newKey.name] = convertObj(obj[key], newKey.adapter);
      }
    } else {
      newObj[newKey.name || newKey] = obj[key];
    }
  });
  return newObj;
}

const caseAdaptions = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  created_by: "createdBy",
  updated_by: "updatedBy",
  account_id: "accountId",
  suite_id: "suiteId",
  test_id: "testId",
  start_time: "startTime",
  end_time: "endTime",
  step_results: "stepResults",
  collection_id: "collectionId",
};

export interface DatabaseToAPIAdapter {
  identifierMap: any;
}

export const Element: DatabaseToAPIAdapter = {
  identifierMap: {
    selector_type: "selectorType",
    ...caseAdaptions,
  },
};

export const User: DatabaseToAPIAdapter = {
  identifierMap: {
    ...caseAdaptions,
  },
};

export const Report: DatabaseToAPIAdapter = {
  identifierMap: {
    ...caseAdaptions,
  },
};

export const Test: DatabaseToAPIAdapter = {
  identifierMap: {
    ...caseAdaptions,
    report: { name: "reports", adapter: Report },
  },
};

export const Suite: DatabaseToAPIAdapter = {
  identifierMap: {
    suite_test: { name: "tests", adapter: Test },
    ...caseAdaptions,
  },
};

export const Collection: DatabaseToAPIAdapter = {
  identifierMap: {
    test: { name: "tests", adapter: Test },
    ...caseAdaptions,
  },
};

export const Account: DatabaseToAPIAdapter = {
  identifierMap: {
    user_info: { name: "users", adapter: User },
    collection: { name: "collections", adapter: Collection },
    suite: "suites",
    element: { name: "elements", adapter: Element },
    ...caseAdaptions,
  },
};
