import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Account = {
  __typename?: 'Account';
  collections: Array<Collection>;
  createdAt: Scalars['DateTime']['output'];
  elements: Array<Element>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  suites: Array<Suite>;
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
};

export type AssertExistsStep = {
  __typename?: 'AssertExistsStep';
  elementId: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
  /**
   * If true, the element must be visible as well as being present in the DOM.
   * default: false.
   */
  visible?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * Asserts that the given javascript code evaluates to true when executed
 * in the test browser.
 */
export type AssertJavascriptStep = {
  __typename?: 'AssertJavascriptStep';
  code: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
};

export type AssertTextStep = {
  __typename?: 'AssertTextStep';
  elementId: Scalars['Int']['output'];
  exactMatch?: Maybe<Scalars['Boolean']['output']>;
  invert?: Maybe<Scalars['Boolean']['output']>;
  stepType: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type ClickStep = {
  __typename?: 'ClickStep';
  elementId: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
};

export type Collection = {
  __typename?: 'Collection';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type CollectionCreateInput = {
  name: Scalars['String']['input'];
};

export type Element = {
  __typename?: 'Element';
  accountId: Scalars['Int']['output'];
  collectionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  selector: Scalars['String']['output'];
  selectorType: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type ElementCreateInput = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  selector: Scalars['String']['input'];
  selectorType: Scalars['String']['input'];
};

export type ExecuteJavascriptStep = {
  __typename?: 'ExecuteJavascriptStep';
  code: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
};

export type GoToStep = {
  __typename?: 'GoToStep';
  stepType: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ImportTestStep = {
  __typename?: 'ImportTestStep';
  stepType: Scalars['String']['output'];
  testId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: Collection;
  createElement: Element;
  createTest: Test;
  createUser: User;
  deleteTest: Scalars['Boolean']['output'];
  executeTest: Scalars['Boolean']['output'];
  login: Scalars['String']['output'];
  signup: Account;
  updateTest: Test;
};


export type MutationCreateCollectionArgs = {
  collection: CollectionCreateInput;
};


export type MutationCreateElementArgs = {
  element: ElementCreateInput;
};


export type MutationCreateTestArgs = {
  test: TestCreateInput;
};


export type MutationCreateUserArgs = {
  user: UserInput;
};


export type MutationDeleteTestArgs = {
  id: Scalars['Int']['input'];
};


export type MutationExecuteTestArgs = {
  testId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  accountName: Scalars['String']['input'];
  adminEmail: Scalars['String']['input'];
  adminPassword: Scalars['String']['input'];
};


export type MutationUpdateTestArgs = {
  id: Scalars['Int']['input'];
  test: TestUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  test: Test;
  user: User;
};


export type QueryTestArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type RefreshStep = {
  __typename?: 'RefreshStep';
  stepType: Scalars['String']['output'];
};

export type Report = {
  __typename?: 'Report';
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  stepResults: Array<TestStepResult>;
  testId: Scalars['Int']['output'];
};

export type SendTextStep = {
  __typename?: 'SendTextStep';
  elementId: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type SetVariableElement = {
  __typename?: 'SetVariableElement';
  elementId: Scalars['Int']['output'];
};

export type SetVariableJavascript = {
  __typename?: 'SetVariableJavascript';
  code: Scalars['String']['output'];
};

/** Set a variable which can be used in later steps like so: {{variable_name}}. */
export type SetVariableStep = {
  __typename?: 'SetVariableStep';
  name: Scalars['String']['output'];
  stepType: Scalars['String']['output'];
  value: SetVariableStepValue;
};

export type SetVariableStepValue = SetVariableElement | SetVariableJavascript | SetVariableString;

export type SetVariableStepValueInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  elementId?: InputMaybe<Scalars['Int']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
};

export type SetVariableString = {
  __typename?: 'SetVariableString';
  string: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  executeTest?: Maybe<Report>;
  report: Report;
};


export type SubscriptionExecuteTestArgs = {
  testId: Scalars['Int']['input'];
};

export type Suite = {
  __typename?: 'Suite';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type SuiteInput = {
  name: Scalars['String']['input'];
};

export type Test = {
  __typename?: 'Test';
  accountId: Scalars['Int']['output'];
  collectionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  reports: Array<Report>;
  steps: Array<TestStep>;
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type TestCreateInput = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  steps: Array<TestStepInput>;
};

export type TestStep = AssertExistsStep | AssertJavascriptStep | AssertTextStep | ClickStep | ExecuteJavascriptStep | GoToStep | ImportTestStep | RefreshStep | SendTextStep | SetVariableStep | WaitStep;

export type TestStepInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  elementId?: InputMaybe<Scalars['Int']['input']>;
  exactMatch?: InputMaybe<Scalars['Boolean']['input']>;
  invert?: InputMaybe<Scalars['Boolean']['input']>;
  milliseconds?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stepType: Scalars['String']['input'];
  testId?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<SetVariableStepValueInput>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TestStepResult = {
  __typename?: 'TestStepResult';
  endTime: Scalars['DateTime']['output'];
  error?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  screenshot?: Maybe<Scalars['String']['output']>;
  status: TestStepStatus;
};

export enum TestStepStatus {
  Error = 'ERROR',
  Fail = 'FAIL',
  None = 'NONE',
  Pass = 'PASS'
}

export type TestUpdateInput = {
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<Array<TestStepInput>>;
};

export type User = {
  __typename?: 'User';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type WaitStep = {
  __typename?: 'WaitStep';
  milliseconds: Scalars['Int']['output'];
  stepType: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = {
  SetVariableStepValue: ( SetVariableElement ) | ( SetVariableJavascript ) | ( SetVariableString );
  TestStep: ( AssertExistsStep ) | ( AssertJavascriptStep ) | ( AssertTextStep ) | ( ClickStep ) | ( ExecuteJavascriptStep ) | ( GoToStep ) | ( ImportTestStep ) | ( RefreshStep ) | ( SendTextStep ) | ( Omit<SetVariableStep, 'value'> & { value: RefType['SetVariableStepValue'] } ) | ( WaitStep );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  AssertExistsStep: ResolverTypeWrapper<AssertExistsStep>;
  AssertJavascriptStep: ResolverTypeWrapper<AssertJavascriptStep>;
  AssertTextStep: ResolverTypeWrapper<AssertTextStep>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ClickStep: ResolverTypeWrapper<ClickStep>;
  Collection: ResolverTypeWrapper<Collection>;
  CollectionCreateInput: CollectionCreateInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Element: ResolverTypeWrapper<Element>;
  ElementCreateInput: ElementCreateInput;
  ExecuteJavascriptStep: ResolverTypeWrapper<ExecuteJavascriptStep>;
  GoToStep: ResolverTypeWrapper<GoToStep>;
  ImportTestStep: ResolverTypeWrapper<ImportTestStep>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RefreshStep: ResolverTypeWrapper<RefreshStep>;
  Report: ResolverTypeWrapper<Report>;
  SendTextStep: ResolverTypeWrapper<SendTextStep>;
  SetVariableElement: ResolverTypeWrapper<SetVariableElement>;
  SetVariableJavascript: ResolverTypeWrapper<SetVariableJavascript>;
  SetVariableStep: ResolverTypeWrapper<Omit<SetVariableStep, 'value'> & { value: ResolversTypes['SetVariableStepValue'] }>;
  SetVariableStepValue: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SetVariableStepValue']>;
  SetVariableStepValueInput: SetVariableStepValueInput;
  SetVariableString: ResolverTypeWrapper<SetVariableString>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Suite: ResolverTypeWrapper<Suite>;
  SuiteInput: SuiteInput;
  Test: ResolverTypeWrapper<Omit<Test, 'steps'> & { steps: Array<ResolversTypes['TestStep']> }>;
  TestCreateInput: TestCreateInput;
  TestStep: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TestStep']>;
  TestStepInput: TestStepInput;
  TestStepResult: ResolverTypeWrapper<TestStepResult>;
  TestStepStatus: TestStepStatus;
  TestUpdateInput: TestUpdateInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  WaitStep: ResolverTypeWrapper<WaitStep>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AssertExistsStep: AssertExistsStep;
  AssertJavascriptStep: AssertJavascriptStep;
  AssertTextStep: AssertTextStep;
  Boolean: Scalars['Boolean']['output'];
  ClickStep: ClickStep;
  Collection: Collection;
  CollectionCreateInput: CollectionCreateInput;
  DateTime: Scalars['DateTime']['output'];
  Element: Element;
  ElementCreateInput: ElementCreateInput;
  ExecuteJavascriptStep: ExecuteJavascriptStep;
  GoToStep: GoToStep;
  ImportTestStep: ImportTestStep;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  RefreshStep: RefreshStep;
  Report: Report;
  SendTextStep: SendTextStep;
  SetVariableElement: SetVariableElement;
  SetVariableJavascript: SetVariableJavascript;
  SetVariableStep: Omit<SetVariableStep, 'value'> & { value: ResolversParentTypes['SetVariableStepValue'] };
  SetVariableStepValue: ResolversUnionTypes<ResolversParentTypes>['SetVariableStepValue'];
  SetVariableStepValueInput: SetVariableStepValueInput;
  SetVariableString: SetVariableString;
  String: Scalars['String']['output'];
  Subscription: {};
  Suite: Suite;
  SuiteInput: SuiteInput;
  Test: Omit<Test, 'steps'> & { steps: Array<ResolversParentTypes['TestStep']> };
  TestCreateInput: TestCreateInput;
  TestStep: ResolversUnionTypes<ResolversParentTypes>['TestStep'];
  TestStepInput: TestStepInput;
  TestStepResult: TestStepResult;
  TestUpdateInput: TestUpdateInput;
  User: User;
  UserInput: UserInput;
  WaitStep: WaitStep;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  elements?: Resolver<Array<ResolversTypes['Element']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suites?: Resolver<Array<ResolversTypes['Suite']>, ParentType, ContextType>;
  tests?: Resolver<Array<ResolversTypes['Test']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssertExistsStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssertExistsStep'] = ResolversParentTypes['AssertExistsStep']> = {
  elementId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssertJavascriptStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssertJavascriptStep'] = ResolversParentTypes['AssertJavascriptStep']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AssertTextStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['AssertTextStep'] = ResolversParentTypes['AssertTextStep']> = {
  elementId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  exactMatch?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  invert?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClickStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClickStep'] = ResolversParentTypes['ClickStep']> = {
  elementId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Collection'] = ResolversParentTypes['Collection']> = {
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tests?: Resolver<Array<ResolversTypes['Test']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ElementResolvers<ContextType = any, ParentType extends ResolversParentTypes['Element'] = ResolversParentTypes['Element']> = {
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collectionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selector?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  selectorType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExecuteJavascriptStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExecuteJavascriptStep'] = ResolversParentTypes['ExecuteJavascriptStep']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GoToStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['GoToStep'] = ResolversParentTypes['GoToStep']> = {
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportTestStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportTestStep'] = ResolversParentTypes['ImportTestStep']> = {
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  testId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCollection?: Resolver<ResolversTypes['Collection'], ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'collection'>>;
  createElement?: Resolver<ResolversTypes['Element'], ParentType, ContextType, RequireFields<MutationCreateElementArgs, 'element'>>;
  createTest?: Resolver<ResolversTypes['Test'], ParentType, ContextType, RequireFields<MutationCreateTestArgs, 'test'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  deleteTest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTestArgs, 'id'>>;
  executeTest?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationExecuteTestArgs, 'testId'>>;
  login?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  signup?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'accountName' | 'adminEmail' | 'adminPassword'>>;
  updateTest?: Resolver<ResolversTypes['Test'], ParentType, ContextType, RequireFields<MutationUpdateTestArgs, 'id' | 'test'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  test?: Resolver<ResolversTypes['Test'], ParentType, ContextType, RequireFields<QueryTestArgs, 'id'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type RefreshStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['RefreshStep'] = ResolversParentTypes['RefreshStep']> = {
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['Report'] = ResolversParentTypes['Report']> = {
  endTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepResults?: Resolver<Array<ResolversTypes['TestStepResult']>, ParentType, ContextType>;
  testId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SendTextStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['SendTextStep'] = ResolversParentTypes['SendTextStep']> = {
  elementId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetVariableElementResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetVariableElement'] = ResolversParentTypes['SetVariableElement']> = {
  elementId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetVariableJavascriptResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetVariableJavascript'] = ResolversParentTypes['SetVariableJavascript']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetVariableStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetVariableStep'] = ResolversParentTypes['SetVariableStep']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['SetVariableStepValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetVariableStepValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetVariableStepValue'] = ResolversParentTypes['SetVariableStepValue']> = {
  __resolveType: TypeResolveFn<'SetVariableElement' | 'SetVariableJavascript' | 'SetVariableString', ParentType, ContextType>;
};

export type SetVariableStringResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetVariableString'] = ResolversParentTypes['SetVariableString']> = {
  string?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  executeTest?: SubscriptionResolver<Maybe<ResolversTypes['Report']>, "executeTest", ParentType, ContextType, RequireFields<SubscriptionExecuteTestArgs, 'testId'>>;
  report?: SubscriptionResolver<ResolversTypes['Report'], "report", ParentType, ContextType>;
};

export type SuiteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Suite'] = ResolversParentTypes['Suite']> = {
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tests?: Resolver<Array<ResolversTypes['Test']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestResolvers<ContextType = any, ParentType extends ResolversParentTypes['Test'] = ResolversParentTypes['Test']> = {
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  collectionId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reports?: Resolver<Array<ResolversTypes['Report']>, ParentType, ContextType>;
  steps?: Resolver<Array<ResolversTypes['TestStep']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestStep'] = ResolversParentTypes['TestStep']> = {
  __resolveType: TypeResolveFn<'AssertExistsStep' | 'AssertJavascriptStep' | 'AssertTextStep' | 'ClickStep' | 'ExecuteJavascriptStep' | 'GoToStep' | 'ImportTestStep' | 'RefreshStep' | 'SendTextStep' | 'SetVariableStep' | 'WaitStep', ParentType, ContextType>;
};

export type TestStepResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestStepResult'] = ResolversParentTypes['TestStepResult']> = {
  endTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  screenshot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TestStepStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WaitStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['WaitStep'] = ResolversParentTypes['WaitStep']> = {
  milliseconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stepType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  AssertExistsStep?: AssertExistsStepResolvers<ContextType>;
  AssertJavascriptStep?: AssertJavascriptStepResolvers<ContextType>;
  AssertTextStep?: AssertTextStepResolvers<ContextType>;
  ClickStep?: ClickStepResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Element?: ElementResolvers<ContextType>;
  ExecuteJavascriptStep?: ExecuteJavascriptStepResolvers<ContextType>;
  GoToStep?: GoToStepResolvers<ContextType>;
  ImportTestStep?: ImportTestStepResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RefreshStep?: RefreshStepResolvers<ContextType>;
  Report?: ReportResolvers<ContextType>;
  SendTextStep?: SendTextStepResolvers<ContextType>;
  SetVariableElement?: SetVariableElementResolvers<ContextType>;
  SetVariableJavascript?: SetVariableJavascriptResolvers<ContextType>;
  SetVariableStep?: SetVariableStepResolvers<ContextType>;
  SetVariableStepValue?: SetVariableStepValueResolvers<ContextType>;
  SetVariableString?: SetVariableStringResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Suite?: SuiteResolvers<ContextType>;
  Test?: TestResolvers<ContextType>;
  TestStep?: TestStepResolvers<ContextType>;
  TestStepResult?: TestStepResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WaitStep?: WaitStepResolvers<ContextType>;
};

