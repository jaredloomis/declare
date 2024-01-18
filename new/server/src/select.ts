import { DatabaseToAPIAdapter, invConvertObj } from 'declare-server-common/src/adapter';

function preprocessSelectionSet(selectionSet: any, fragments: any) {
  if (!selectionSet?.selections) {
    return true;
  }

  let ret: any = {};
  for (const selection of selectionSet.selections) {
    // Built-in fields (ignore)
    if (!selection.name || selection.name.value.indexOf('__') === 0) {
      continue;
    }

    // Resolve fragments
    if (selection.name.value.charAt(0) === selection.name.value.charAt(0).toUpperCase()) {
      ret = preprocessSelectionSet(fragments[selection.name.value].selectionSet, fragments);
      continue;
    }
    // TODO THIS IS INCORRECT (prisma.test!)
    if (selection.selectionSet) {
      // Resolve relational fields
      ret[selection.name.value] = preprocessSelectionSet(selection.selectionSet, fragments);
    } else {
      ret[selection.name.value] = true;
    }
  }
  return ret;
}

function postprocessSelectionSet(selectionSet: any) {
  const ret: any = {};
  for (const [key, value] of Object.entries(selectionSet)) {
    if (typeof value === 'object') {
      ret[key] = { select: postprocessSelectionSet(value) };
    } else {
      ret[key] = value;
    }
  }
  return ret;
}

export function prismaSelect(adapter: DatabaseToAPIAdapter, info: any) {
  const selectFields = preprocessSelectionSet(info.operation.selectionSet.selections[0].selectionSet, info.fragments);
  const invMap = invConvertObj(selectFields, adapter);
  //return invMap;
  return postprocessSelectionSet(invMap);
}
