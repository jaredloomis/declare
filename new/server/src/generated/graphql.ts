import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  suites: Array<Suite>;
  tests: Array<Test>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: Account;
  createCollection?: Maybe<Collection>;
  createTest?: Maybe<Test>;
  createUser?: Maybe<User>;
  executeTest?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<Scalars['String']['output']>;
};


export type MutationCreateAccountArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateCollectionArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTestArgs = {
  collectionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  steps: Scalars['JSON']['input'];
};


export type MutationCreateUserArgs = {
  accountId: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationExecuteTestArgs = {
  testId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  user?: Maybe<User>;
};


export type QueryAccountArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Report = {
  __typename?: 'Report';
  duration: Scalars['Int']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  startTime: Scalars['DateTime']['output'];
  status: Scalars['String']['output'];
  stepResults: Scalars['JSON']['output'];
  testId: Scalars['Int']['output'];
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

export type Test = {
  __typename?: 'Test';
  accountId: Scalars['Int']['output'];
  collectionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  reports: Array<Report>;
  steps?: Maybe<Scalars['JSON']['output']>;
  suiteId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  accountId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  password: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<Account>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Collection: ResolverTypeWrapper<Collection>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Report: ResolverTypeWrapper<Report>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  Suite: ResolverTypeWrapper<Suite>;
  Test: ResolverTypeWrapper<Test>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  Boolean: Scalars['Boolean']['output'];
  Collection: Collection;
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Query: {};
  Report: Report;
  String: Scalars['String']['output'];
  Subscription: {};
  Suite: Suite;
  Test: Test;
  User: User;
};

export type AccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  collections?: Resolver<Array<ResolversTypes['Collection']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suites?: Resolver<Array<ResolversTypes['Suite']>, ParentType, ContextType>;
  tests?: Resolver<Array<ResolversTypes['Test']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
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

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['Account'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'name'>>;
  createCollection?: Resolver<Maybe<ResolversTypes['Collection']>, ParentType, ContextType, RequireFields<MutationCreateCollectionArgs, 'name'>>;
  createTest?: Resolver<Maybe<ResolversTypes['Test']>, ParentType, ContextType, RequireFields<MutationCreateTestArgs, 'collectionId' | 'name' | 'steps'>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'accountId' | 'email' | 'password'>>;
  executeTest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationExecuteTestArgs, 'testId'>>;
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  account?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType, RequireFields<QueryAccountArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type ReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['Report'] = ResolversParentTypes['Report']> = {
  duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stepResults?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  testId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  steps?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  suiteId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedBy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  accountId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Account?: AccountResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Report?: ReportResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Suite?: SuiteResolvers<ContextType>;
  Test?: TestResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

