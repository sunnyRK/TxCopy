import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { fetcher } from './auth-defi-fetcher'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: any
  BigInt: any
  Bytes: any
}

export type Account = {
  __typename?: 'Account'
  /**  Address of the account  */
  id: Scalars['ID']
}

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Account_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<Account_Filter>>>
}

export enum Account_OrderBy {
  Id = 'id',
}

export type ActiveAccount = {
  __typename?: 'ActiveAccount'
  /**  { Address of the account }-{ Days since Unix epoch }-{ [Optional] HH: hour of the day }  */
  id: Scalars['ID']
}

export type ActiveAccount_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<ActiveAccount_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<ActiveAccount_Filter>>>
}

export enum ActiveAccount_OrderBy {
  Id = 'id',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

export type Deposit = {
  __typename?: 'Deposit'
  /**  USD-normalized value of the transaction of the underlying (e.g. sum of tokens deposited into a pool)  */
  amountUSD: Scalars['BigDecimal']
  /**  Block number of this event  */
  blockNumber: Scalars['BigInt']
  /**  Address that sent the tokens  */
  from: Scalars['String']
  /**  Transaction hash of the transaction that emitted this event  */
  hash: Scalars['String']
  /**  deposit-{ Transaction hash }-{ Log index }  */
  id: Scalars['ID']
  /**  Amount of input tokens in the token's native unit  */
  inputTokenAmounts: Array<Scalars['BigInt']>
  /**  Input tokens of the pool. E.g. WETH and USDC to a WETH-USDC pool  */
  inputTokens: Array<Token>
  /**  Event log index. For transactions that don't emit event, create arbitrary index starting from 0  */
  logIndex: Scalars['Int']
  /**  Output token of the pool. E.g. the UNI-LP token  */
  outputToken?: Maybe<Token>
  /**  Amount of output tokens in the token's native unit  */
  outputTokenAmount?: Maybe<Scalars['BigInt']>
  /**  The pool involving this transaction  */
  pool: LiquidityPool
  /**  The protocol this transaction belongs to  */
  protocol: DexAmmProtocol
  /**  Timestamp of this event  */
  timestamp: Scalars['BigInt']
  /**  Address that received the tokens  */
  to: Scalars['String']
}

export type DepositInputTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token_Filter>
}

export type Deposit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amountUSD?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  and?: InputMaybe<Array<InputMaybe<Deposit_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['String']>
  from_contains?: InputMaybe<Scalars['String']>
  from_contains_nocase?: InputMaybe<Scalars['String']>
  from_ends_with?: InputMaybe<Scalars['String']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_gt?: InputMaybe<Scalars['String']>
  from_gte?: InputMaybe<Scalars['String']>
  from_in?: InputMaybe<Array<Scalars['String']>>
  from_lt?: InputMaybe<Scalars['String']>
  from_lte?: InputMaybe<Scalars['String']>
  from_not?: InputMaybe<Scalars['String']>
  from_not_contains?: InputMaybe<Scalars['String']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']>
  from_not_ends_with?: InputMaybe<Scalars['String']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_not_in?: InputMaybe<Array<Scalars['String']>>
  from_not_starts_with?: InputMaybe<Scalars['String']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  from_starts_with?: InputMaybe<Scalars['String']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash?: InputMaybe<Scalars['String']>
  hash_contains?: InputMaybe<Scalars['String']>
  hash_contains_nocase?: InputMaybe<Scalars['String']>
  hash_ends_with?: InputMaybe<Scalars['String']>
  hash_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_gt?: InputMaybe<Scalars['String']>
  hash_gte?: InputMaybe<Scalars['String']>
  hash_in?: InputMaybe<Array<Scalars['String']>>
  hash_lt?: InputMaybe<Scalars['String']>
  hash_lte?: InputMaybe<Scalars['String']>
  hash_not?: InputMaybe<Scalars['String']>
  hash_not_contains?: InputMaybe<Scalars['String']>
  hash_not_contains_nocase?: InputMaybe<Scalars['String']>
  hash_not_ends_with?: InputMaybe<Scalars['String']>
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_not_in?: InputMaybe<Array<Scalars['String']>>
  hash_not_starts_with?: InputMaybe<Scalars['String']>
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash_starts_with?: InputMaybe<Scalars['String']>
  hash_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  inputTokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokens?: InputMaybe<Array<Scalars['String']>>
  inputTokens_?: InputMaybe<Token_Filter>
  inputTokens_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  logIndex?: InputMaybe<Scalars['Int']>
  logIndex_gt?: InputMaybe<Scalars['Int']>
  logIndex_gte?: InputMaybe<Scalars['Int']>
  logIndex_in?: InputMaybe<Array<Scalars['Int']>>
  logIndex_lt?: InputMaybe<Scalars['Int']>
  logIndex_lte?: InputMaybe<Scalars['Int']>
  logIndex_not?: InputMaybe<Scalars['Int']>
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']>>
  or?: InputMaybe<Array<InputMaybe<Deposit_Filter>>>
  outputToken?: InputMaybe<Scalars['String']>
  outputTokenAmount?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_gt?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_gte?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputTokenAmount_lt?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_lte?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_not?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputToken_?: InputMaybe<Token_Filter>
  outputToken_contains?: InputMaybe<Scalars['String']>
  outputToken_contains_nocase?: InputMaybe<Scalars['String']>
  outputToken_ends_with?: InputMaybe<Scalars['String']>
  outputToken_ends_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_gt?: InputMaybe<Scalars['String']>
  outputToken_gte?: InputMaybe<Scalars['String']>
  outputToken_in?: InputMaybe<Array<Scalars['String']>>
  outputToken_lt?: InputMaybe<Scalars['String']>
  outputToken_lte?: InputMaybe<Scalars['String']>
  outputToken_not?: InputMaybe<Scalars['String']>
  outputToken_not_contains?: InputMaybe<Scalars['String']>
  outputToken_not_contains_nocase?: InputMaybe<Scalars['String']>
  outputToken_not_ends_with?: InputMaybe<Scalars['String']>
  outputToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_not_in?: InputMaybe<Array<Scalars['String']>>
  outputToken_not_starts_with?: InputMaybe<Scalars['String']>
  outputToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_starts_with?: InputMaybe<Scalars['String']>
  outputToken_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool?: InputMaybe<Scalars['String']>
  pool_?: InputMaybe<LiquidityPool_Filter>
  pool_contains?: InputMaybe<Scalars['String']>
  pool_contains_nocase?: InputMaybe<Scalars['String']>
  pool_ends_with?: InputMaybe<Scalars['String']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_gt?: InputMaybe<Scalars['String']>
  pool_gte?: InputMaybe<Scalars['String']>
  pool_in?: InputMaybe<Array<Scalars['String']>>
  pool_lt?: InputMaybe<Scalars['String']>
  pool_lte?: InputMaybe<Scalars['String']>
  pool_not?: InputMaybe<Scalars['String']>
  pool_not_contains?: InputMaybe<Scalars['String']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>
  pool_not_ends_with?: InputMaybe<Scalars['String']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_not_in?: InputMaybe<Array<Scalars['String']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool_starts_with?: InputMaybe<Scalars['String']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['String']>
  to_contains?: InputMaybe<Scalars['String']>
  to_contains_nocase?: InputMaybe<Scalars['String']>
  to_ends_with?: InputMaybe<Scalars['String']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_gt?: InputMaybe<Scalars['String']>
  to_gte?: InputMaybe<Scalars['String']>
  to_in?: InputMaybe<Array<Scalars['String']>>
  to_lt?: InputMaybe<Scalars['String']>
  to_lte?: InputMaybe<Scalars['String']>
  to_not?: InputMaybe<Scalars['String']>
  to_not_contains?: InputMaybe<Scalars['String']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']>
  to_not_ends_with?: InputMaybe<Scalars['String']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_not_in?: InputMaybe<Array<Scalars['String']>>
  to_not_starts_with?: InputMaybe<Scalars['String']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  to_starts_with?: InputMaybe<Scalars['String']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Deposit_OrderBy {
  AmountUsd = 'amountUSD',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  InputTokenAmounts = 'inputTokenAmounts',
  InputTokens = 'inputTokens',
  LogIndex = 'logIndex',
  OutputToken = 'outputToken',
  OutputTokenAmount = 'outputTokenAmount',
  OutputTokenDecimals = 'outputToken__decimals',
  OutputTokenId = 'outputToken__id',
  OutputTokenLastPriceBlockNumber = 'outputToken__lastPriceBlockNumber',
  OutputTokenLastPriceUsd = 'outputToken__lastPriceUSD',
  OutputTokenName = 'outputToken__name',
  OutputTokenSymbol = 'outputToken__symbol',
  Pool = 'pool',
  PoolCreatedBlockNumber = 'pool__createdBlockNumber',
  PoolCreatedTimestamp = 'pool__createdTimestamp',
  PoolCumulativeProtocolSideRevenueUsd = 'pool__cumulativeProtocolSideRevenueUSD',
  PoolCumulativeSupplySideRevenueUsd = 'pool__cumulativeSupplySideRevenueUSD',
  PoolCumulativeTotalRevenueUsd = 'pool__cumulativeTotalRevenueUSD',
  PoolCumulativeVolumeUsd = 'pool__cumulativeVolumeUSD',
  PoolId = 'pool__id',
  PoolIsSingleSided = 'pool__isSingleSided',
  PoolName = 'pool__name',
  PoolOutputTokenPriceUsd = 'pool__outputTokenPriceUSD',
  PoolOutputTokenSupply = 'pool__outputTokenSupply',
  PoolStakedOutputTokenAmount = 'pool__stakedOutputTokenAmount',
  PoolSymbol = 'pool__symbol',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
  To = 'to',
}

export type DexAmmProtocol = Protocol & {
  __typename?: 'DexAmmProtocol'
  /**  This is a boolean to indicate whether or not the pools have been instantiated the were initialized before Optimism regenesis  */
  _regenesis: Scalars['Boolean']
  /**  Gross revenue for the protocol (revenue claimed by protocol). Examples: AMM protocol fee (Sushi’s 0.05%). OpenSea 10% sell fee.  */
  cumulativeProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  Revenue claimed by suppliers to the protocol. LPs on DEXs (e.g. 0.25% of the swap fee in Sushiswap). Depositors on Lending Protocols. NFT sellers on OpenSea.  */
  cumulativeSupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the protocol. e.g. 0.30% of swap fee in Sushiswap, all yield generated by Yearn.  */
  cumulativeTotalRevenueUSD: Scalars['BigDecimal']
  /**  Number of cumulative unique users  */
  cumulativeUniqueUsers: Scalars['Int']
  /**  All historical volume in USD  */
  cumulativeVolumeUSD: Scalars['BigDecimal']
  /**  Daily usage metrics for this protocol  */
  dailyUsageMetrics: Array<UsageMetricsDailySnapshot>
  /**  Daily financial metrics for this protocol  */
  financialMetrics: Array<FinancialsDailySnapshot>
  /**  Hourly usage metrics for this protocol  */
  hourlyUsageMetrics: Array<UsageMetricsHourlySnapshot>
  /**  Smart contract address of the protocol's main contract (Factory, Registry, etc)  */
  id: Scalars['ID']
  /**  Version of the methodology used to compute metrics, loosely based on SemVer format (e.g. 1.0.0)  */
  methodologyVersion: Scalars['String']
  /**  Name of the protocol, including version. e.g. Uniswap v3  */
  name: Scalars['String']
  /**  The blockchain network this subgraph is indexing on  */
  network: Network
  /**  All pools that belong to this protocol  */
  pools: Array<LiquidityPool>
  /**  Current PCV (Protocol Controlled Value). Only relevant for protocols with PCV.  */
  protocolControlledValueUSD?: Maybe<Scalars['BigDecimal']>
  /**  Version of the subgraph schema, in SemVer format (e.g. 1.0.0)  */
  schemaVersion: Scalars['String']
  /**  Slug of protocol, including version. e.g. uniswap-v3  */
  slug: Scalars['String']
  /**  Version of the subgraph implementation, in SemVer format (e.g. 1.0.0)  */
  subgraphVersion: Scalars['String']
  /**  Total number of pools  */
  totalPoolCount: Scalars['Int']
  /**  Current TVL (Total Value Locked) of the entire protocol  */
  totalValueLockedUSD: Scalars['BigDecimal']
  /**  The type of protocol (e.g. DEX, Lending, Yield, etc)  */
  type: ProtocolType
}

export type DexAmmProtocolDailyUsageMetricsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<UsageMetricsDailySnapshot_Filter>
}

export type DexAmmProtocolFinancialMetricsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<FinancialsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<FinancialsDailySnapshot_Filter>
}

export type DexAmmProtocolHourlyUsageMetricsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<UsageMetricsHourlySnapshot_Filter>
}

export type DexAmmProtocolPoolsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<LiquidityPool_Filter>
}

export type DexAmmProtocol_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  _regenesis?: InputMaybe<Scalars['Boolean']>
  _regenesis_in?: InputMaybe<Array<Scalars['Boolean']>>
  _regenesis_not?: InputMaybe<Scalars['Boolean']>
  _regenesis_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  and?: InputMaybe<Array<InputMaybe<DexAmmProtocol_Filter>>>
  cumulativeProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeSupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeSupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeUniqueUsers?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_in?: InputMaybe<Array<Scalars['Int']>>
  cumulativeUniqueUsers_lt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_lte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not_in?: InputMaybe<Array<Scalars['Int']>>
  cumulativeVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyUsageMetrics_?: InputMaybe<UsageMetricsDailySnapshot_Filter>
  financialMetrics_?: InputMaybe<FinancialsDailySnapshot_Filter>
  hourlyUsageMetrics_?: InputMaybe<UsageMetricsHourlySnapshot_Filter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  methodologyVersion?: InputMaybe<Scalars['String']>
  methodologyVersion_contains?: InputMaybe<Scalars['String']>
  methodologyVersion_contains_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_ends_with?: InputMaybe<Scalars['String']>
  methodologyVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_gt?: InputMaybe<Scalars['String']>
  methodologyVersion_gte?: InputMaybe<Scalars['String']>
  methodologyVersion_in?: InputMaybe<Array<Scalars['String']>>
  methodologyVersion_lt?: InputMaybe<Scalars['String']>
  methodologyVersion_lte?: InputMaybe<Scalars['String']>
  methodologyVersion_not?: InputMaybe<Scalars['String']>
  methodologyVersion_not_contains?: InputMaybe<Scalars['String']>
  methodologyVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_not_ends_with?: InputMaybe<Scalars['String']>
  methodologyVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  methodologyVersion_not_starts_with?: InputMaybe<Scalars['String']>
  methodologyVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_starts_with?: InputMaybe<Scalars['String']>
  methodologyVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  network?: InputMaybe<Network>
  network_in?: InputMaybe<Array<Network>>
  network_not?: InputMaybe<Network>
  network_not_in?: InputMaybe<Array<Network>>
  or?: InputMaybe<Array<InputMaybe<DexAmmProtocol_Filter>>>
  pools_?: InputMaybe<LiquidityPool_Filter>
  protocolControlledValueUSD?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  protocolControlledValueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  schemaVersion?: InputMaybe<Scalars['String']>
  schemaVersion_contains?: InputMaybe<Scalars['String']>
  schemaVersion_contains_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_ends_with?: InputMaybe<Scalars['String']>
  schemaVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_gt?: InputMaybe<Scalars['String']>
  schemaVersion_gte?: InputMaybe<Scalars['String']>
  schemaVersion_in?: InputMaybe<Array<Scalars['String']>>
  schemaVersion_lt?: InputMaybe<Scalars['String']>
  schemaVersion_lte?: InputMaybe<Scalars['String']>
  schemaVersion_not?: InputMaybe<Scalars['String']>
  schemaVersion_not_contains?: InputMaybe<Scalars['String']>
  schemaVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_not_ends_with?: InputMaybe<Scalars['String']>
  schemaVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  schemaVersion_not_starts_with?: InputMaybe<Scalars['String']>
  schemaVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_starts_with?: InputMaybe<Scalars['String']>
  schemaVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  slug_contains?: InputMaybe<Scalars['String']>
  slug_contains_nocase?: InputMaybe<Scalars['String']>
  slug_ends_with?: InputMaybe<Scalars['String']>
  slug_ends_with_nocase?: InputMaybe<Scalars['String']>
  slug_gt?: InputMaybe<Scalars['String']>
  slug_gte?: InputMaybe<Scalars['String']>
  slug_in?: InputMaybe<Array<Scalars['String']>>
  slug_lt?: InputMaybe<Scalars['String']>
  slug_lte?: InputMaybe<Scalars['String']>
  slug_not?: InputMaybe<Scalars['String']>
  slug_not_contains?: InputMaybe<Scalars['String']>
  slug_not_contains_nocase?: InputMaybe<Scalars['String']>
  slug_not_ends_with?: InputMaybe<Scalars['String']>
  slug_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  slug_not_in?: InputMaybe<Array<Scalars['String']>>
  slug_not_starts_with?: InputMaybe<Scalars['String']>
  slug_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  slug_starts_with?: InputMaybe<Scalars['String']>
  slug_starts_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion?: InputMaybe<Scalars['String']>
  subgraphVersion_contains?: InputMaybe<Scalars['String']>
  subgraphVersion_contains_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_ends_with?: InputMaybe<Scalars['String']>
  subgraphVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_gt?: InputMaybe<Scalars['String']>
  subgraphVersion_gte?: InputMaybe<Scalars['String']>
  subgraphVersion_in?: InputMaybe<Array<Scalars['String']>>
  subgraphVersion_lt?: InputMaybe<Scalars['String']>
  subgraphVersion_lte?: InputMaybe<Scalars['String']>
  subgraphVersion_not?: InputMaybe<Scalars['String']>
  subgraphVersion_not_contains?: InputMaybe<Scalars['String']>
  subgraphVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_not_ends_with?: InputMaybe<Scalars['String']>
  subgraphVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  subgraphVersion_not_starts_with?: InputMaybe<Scalars['String']>
  subgraphVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_starts_with?: InputMaybe<Scalars['String']>
  subgraphVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  totalPoolCount?: InputMaybe<Scalars['Int']>
  totalPoolCount_gt?: InputMaybe<Scalars['Int']>
  totalPoolCount_gte?: InputMaybe<Scalars['Int']>
  totalPoolCount_in?: InputMaybe<Array<Scalars['Int']>>
  totalPoolCount_lt?: InputMaybe<Scalars['Int']>
  totalPoolCount_lte?: InputMaybe<Scalars['Int']>
  totalPoolCount_not?: InputMaybe<Scalars['Int']>
  totalPoolCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  type?: InputMaybe<ProtocolType>
  type_in?: InputMaybe<Array<ProtocolType>>
  type_not?: InputMaybe<ProtocolType>
  type_not_in?: InputMaybe<Array<ProtocolType>>
}

export enum DexAmmProtocol_OrderBy {
  Regenesis = '_regenesis',
  CumulativeProtocolSideRevenueUsd = 'cumulativeProtocolSideRevenueUSD',
  CumulativeSupplySideRevenueUsd = 'cumulativeSupplySideRevenueUSD',
  CumulativeTotalRevenueUsd = 'cumulativeTotalRevenueUSD',
  CumulativeUniqueUsers = 'cumulativeUniqueUsers',
  CumulativeVolumeUsd = 'cumulativeVolumeUSD',
  DailyUsageMetrics = 'dailyUsageMetrics',
  FinancialMetrics = 'financialMetrics',
  HourlyUsageMetrics = 'hourlyUsageMetrics',
  Id = 'id',
  MethodologyVersion = 'methodologyVersion',
  Name = 'name',
  Network = 'network',
  Pools = 'pools',
  ProtocolControlledValueUsd = 'protocolControlledValueUSD',
  SchemaVersion = 'schemaVersion',
  Slug = 'slug',
  SubgraphVersion = 'subgraphVersion',
  TotalPoolCount = 'totalPoolCount',
  TotalValueLockedUsd = 'totalValueLockedUSD',
  Type = 'type',
}

/**
 * An event is any user action that occurs in a protocol. Generally, they are Ethereum events
 * emitted by a function in the smart contracts, stored in transaction receipts as event logs.
 * However, some user actions of interest are function calls that don't emit events. For example,
 * the deposit and withdraw functions in Yearn do not emit any events. In our subgraphs, we still
 * store them as events, although they are not technically Ethereum events emitted by smart
 * contracts.
 *
 */
export type Event = {
  /**  Block number of this event  */
  blockNumber: Scalars['BigInt']
  /**  Address that sent the tokens  */
  from: Scalars['String']
  /**  Transaction hash of the transaction that emitted this event  */
  hash: Scalars['String']
  /**  { Event type }-{ Transaction hash }-{ Log index }  */
  id: Scalars['ID']
  /**  Event log index. For transactions that don't emit event, create arbitrary index starting from 0  */
  logIndex: Scalars['Int']
  /**  The protocol this transaction belongs to  */
  protocol: DexAmmProtocol
  /**  Timestamp of this event  */
  timestamp: Scalars['BigInt']
  /**  Address that received the tokens  */
  to: Scalars['String']
}

export type Event_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Event_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['String']>
  from_contains?: InputMaybe<Scalars['String']>
  from_contains_nocase?: InputMaybe<Scalars['String']>
  from_ends_with?: InputMaybe<Scalars['String']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_gt?: InputMaybe<Scalars['String']>
  from_gte?: InputMaybe<Scalars['String']>
  from_in?: InputMaybe<Array<Scalars['String']>>
  from_lt?: InputMaybe<Scalars['String']>
  from_lte?: InputMaybe<Scalars['String']>
  from_not?: InputMaybe<Scalars['String']>
  from_not_contains?: InputMaybe<Scalars['String']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']>
  from_not_ends_with?: InputMaybe<Scalars['String']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_not_in?: InputMaybe<Array<Scalars['String']>>
  from_not_starts_with?: InputMaybe<Scalars['String']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  from_starts_with?: InputMaybe<Scalars['String']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash?: InputMaybe<Scalars['String']>
  hash_contains?: InputMaybe<Scalars['String']>
  hash_contains_nocase?: InputMaybe<Scalars['String']>
  hash_ends_with?: InputMaybe<Scalars['String']>
  hash_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_gt?: InputMaybe<Scalars['String']>
  hash_gte?: InputMaybe<Scalars['String']>
  hash_in?: InputMaybe<Array<Scalars['String']>>
  hash_lt?: InputMaybe<Scalars['String']>
  hash_lte?: InputMaybe<Scalars['String']>
  hash_not?: InputMaybe<Scalars['String']>
  hash_not_contains?: InputMaybe<Scalars['String']>
  hash_not_contains_nocase?: InputMaybe<Scalars['String']>
  hash_not_ends_with?: InputMaybe<Scalars['String']>
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_not_in?: InputMaybe<Array<Scalars['String']>>
  hash_not_starts_with?: InputMaybe<Scalars['String']>
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash_starts_with?: InputMaybe<Scalars['String']>
  hash_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  logIndex?: InputMaybe<Scalars['Int']>
  logIndex_gt?: InputMaybe<Scalars['Int']>
  logIndex_gte?: InputMaybe<Scalars['Int']>
  logIndex_in?: InputMaybe<Array<Scalars['Int']>>
  logIndex_lt?: InputMaybe<Scalars['Int']>
  logIndex_lte?: InputMaybe<Scalars['Int']>
  logIndex_not?: InputMaybe<Scalars['Int']>
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']>>
  or?: InputMaybe<Array<InputMaybe<Event_Filter>>>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['String']>
  to_contains?: InputMaybe<Scalars['String']>
  to_contains_nocase?: InputMaybe<Scalars['String']>
  to_ends_with?: InputMaybe<Scalars['String']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_gt?: InputMaybe<Scalars['String']>
  to_gte?: InputMaybe<Scalars['String']>
  to_in?: InputMaybe<Array<Scalars['String']>>
  to_lt?: InputMaybe<Scalars['String']>
  to_lte?: InputMaybe<Scalars['String']>
  to_not?: InputMaybe<Scalars['String']>
  to_not_contains?: InputMaybe<Scalars['String']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']>
  to_not_ends_with?: InputMaybe<Scalars['String']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_not_in?: InputMaybe<Array<Scalars['String']>>
  to_not_starts_with?: InputMaybe<Scalars['String']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  to_starts_with?: InputMaybe<Scalars['String']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Event_OrderBy {
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
  To = 'to',
}

export type FinancialsDailySnapshot = {
  __typename?: 'FinancialsDailySnapshot'
  /**  Block number of this snapshot  */
  blockNumber: Scalars['BigInt']
  /**  Gross revenue for the protocol (revenue claimed by protocol). Examples: AMM protocol fee (Sushi’s 0.05%). OpenSea 10% sell fee.  */
  cumulativeProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  Revenue claimed by suppliers to the protocol. LPs on DEXs (e.g. 0.25% of the swap fee in Sushiswap). Depositors on Lending Protocols. NFT sellers on OpenSea.  */
  cumulativeSupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the protocol. e.g. 0.30% of swap fee in Sushiswap, all yield generated by Yearn.  */
  cumulativeTotalRevenueUSD: Scalars['BigDecimal']
  /**  All historical trade volume in USD  */
  cumulativeVolumeUSD: Scalars['BigDecimal']
  /**  Gross revenue for the protocol (revenue claimed by protocol). Examples: AMM protocol fee (Sushi’s 0.05%). OpenSea 10% sell fee.  */
  dailyProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  Revenue claimed by suppliers to the protocol. LPs on DEXs (e.g. 0.25% of the swap fee in Sushiswap). Depositors on Lending Protocols. NFT sellers on OpenSea.  */
  dailySupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the protocol. e.g. 0.30% of swap fee in Sushiswap, all yield generated by Yearn.  */
  dailyTotalRevenueUSD: Scalars['BigDecimal']
  /**  All trade volume occurred in a given day, in USD  */
  dailyVolumeUSD: Scalars['BigDecimal']
  /**  ID is # of days since Unix epoch time  */
  id: Scalars['ID']
  /**  Protocol this snapshot is associated with  */
  protocol: DexAmmProtocol
  /**  Current PCV (Protocol Controlled Value). Only relevant for protocols with PCV.  */
  protocolControlledValueUSD?: Maybe<Scalars['BigDecimal']>
  /**  Timestamp of this snapshot  */
  timestamp: Scalars['BigInt']
  /**  Current TVL (Total Value Locked) of the entire protocol  */
  totalValueLockedUSD: Scalars['BigDecimal']
}

export type FinancialsDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<FinancialsDailySnapshot_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  cumulativeProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeSupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeSupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailySupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailySupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<FinancialsDailySnapshot_Filter>>>
  protocol?: InputMaybe<Scalars['String']>
  protocolControlledValueUSD?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  protocolControlledValueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
}

export enum FinancialsDailySnapshot_OrderBy {
  BlockNumber = 'blockNumber',
  CumulativeProtocolSideRevenueUsd = 'cumulativeProtocolSideRevenueUSD',
  CumulativeSupplySideRevenueUsd = 'cumulativeSupplySideRevenueUSD',
  CumulativeTotalRevenueUsd = 'cumulativeTotalRevenueUSD',
  CumulativeVolumeUsd = 'cumulativeVolumeUSD',
  DailyProtocolSideRevenueUsd = 'dailyProtocolSideRevenueUSD',
  DailySupplySideRevenueUsd = 'dailySupplySideRevenueUSD',
  DailyTotalRevenueUsd = 'dailyTotalRevenueUSD',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolControlledValueUsd = 'protocolControlledValueUSD',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
  TotalValueLockedUsd = 'totalValueLockedUSD',
}

export type LiquidityPool = {
  __typename?: 'LiquidityPool'
  /**  Creation block number  */
  createdBlockNumber: Scalars['BigInt']
  /**  Creation timestamp  */
  createdTimestamp: Scalars['BigInt']
  /**  All revenue generated by the liquidity pool, accrued to the protocol.  */
  cumulativeProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the liquidity pool, accrued to the supply side.  */
  cumulativeSupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the liquidity pool.  */
  cumulativeTotalRevenueUSD: Scalars['BigDecimal']
  /**  All historical trade volume occurred in this pool, in USD  */
  cumulativeVolumeUSD: Scalars['BigDecimal']
  /**  Liquidity pool daily snapshots  */
  dailySnapshots: Array<LiquidityPoolDailySnapshot>
  /**  All deposit (add liquidity) events occurred in this pool  */
  deposits: Array<Deposit>
  /**  Fees per trade incurred to the user. Should include all fees that apply to a pool (e.g. Curve has a trading fee AND an admin fee, which is a portion of the trading fee. Uniswap only has a trading fee and no protocol fee. )  */
  fees: Array<LiquidityPoolFee>
  /**  Liquidity pool hourly snapshots  */
  hourlySnapshots: Array<LiquidityPoolHourlySnapshot>
  /**  Smart contract address of the pool  */
  id: Scalars['ID']
  /**  Amount of input tokens in the pool. The ordering should be the same as the pool's `inputTokens` field.  */
  inputTokenBalances: Array<Scalars['BigInt']>
  /**  Weights of input tokens in the liquidity pool in percentage values. For example, 50/50 for Uniswap pools, 48.2/51.8 for a Curve pool, 10/10/80 for a Balancer pool  */
  inputTokenWeights: Array<Scalars['BigDecimal']>
  /**  Tokens that need to be deposited to take a position in protocol. e.g. WETH and USDC to deposit into the WETH-USDC pool. Array to account for multi-asset pools like Curve and Balancer  */
  inputTokens: Array<Token>
  /**  Whether this pool is single-sided (e.g. Bancor, Platypus's Alternative Pool). The specifics of the implementation depends on the protocol.  */
  isSingleSided: Scalars['Boolean']
  /**  Name of liquidity pool (e.g. Curve.fi DAI/USDC/USDT)  */
  name?: Maybe<Scalars['String']>
  /**  Token that is minted to track ownership of position in protocol  */
  outputToken?: Maybe<Token>
  /**  Price per share of output token in USD  */
  outputTokenPriceUSD?: Maybe<Scalars['BigDecimal']>
  /**  Total supply of output token. Note that certain DEXes don't have an output token (e.g. Bancor)  */
  outputTokenSupply?: Maybe<Scalars['BigInt']>
  /**  The protocol this pool belongs to  */
  protocol: DexAmmProtocol
  /**  Per-block reward token emission as of the current block normalized to a day, in token's native amount. This should be ideally calculated as the theoretical rate instead of the realized amount.  */
  rewardTokenEmissionsAmount?: Maybe<Array<Scalars['BigInt']>>
  /**  Per-block reward token emission as of the current block normalized to a day, in USD value. This should be ideally calculated as the theoretical rate instead of the realized amount.  */
  rewardTokenEmissionsUSD?: Maybe<Array<Scalars['BigDecimal']>>
  /**  Aditional tokens that are given as reward for position in a protocol, usually in liquidity mining programs. e.g. SUSHI in the Onsen program, MATIC for Aave Polygon, usually in liquidity mining programs. e.g. SUSHI in the Onsen program, MATIC for Aave Polygon  */
  rewardTokens?: Maybe<Array<RewardToken>>
  /**  Total supply of output tokens that are staked (usually in the MasterChef contract). Used to calculate reward APY.  */
  stakedOutputTokenAmount?: Maybe<Scalars['BigInt']>
  /**  All trade (swap) events occurred in this pool  */
  swaps: Array<Swap>
  /**  Symbol of liquidity pool (e.g. 3CRV)  */
  symbol?: Maybe<Scalars['String']>
  /**  Current TVL (Total Value Locked) of this pool in USD  */
  totalValueLockedUSD: Scalars['BigDecimal']
  /**  All withdraw (remove liquidity) events occurred in this pool  */
  withdraws: Array<Withdraw>
}

export type LiquidityPoolDailySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<LiquidityPoolDailySnapshot_Filter>
}

export type LiquidityPoolDepositsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Deposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Deposit_Filter>
}

export type LiquidityPoolFeesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolFee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<LiquidityPoolFee_Filter>
}

export type LiquidityPoolHourlySnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<LiquidityPoolHourlySnapshot_Filter>
}

export type LiquidityPoolInputTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token_Filter>
}

export type LiquidityPoolRewardTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<RewardToken_Filter>
}

export type LiquidityPoolSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Swap_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Swap_Filter>
}

export type LiquidityPoolWithdrawsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Withdraw_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Withdraw_Filter>
}

export type LiquidityPoolDailySnapshot = {
  __typename?: 'LiquidityPoolDailySnapshot'
  /**  Block number of this snapshot  */
  blockNumber: Scalars['BigInt']
  /**  All revenue generated by the liquidity pool, accrued to the protocol.  */
  cumulativeProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the liquidity pool, accrued to the supply side.  */
  cumulativeSupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the liquidity pool.  */
  cumulativeTotalRevenueUSD: Scalars['BigDecimal']
  /**  All historical trade volume occurred in this pool, in USD  */
  cumulativeVolumeUSD: Scalars['BigDecimal']
  /**  Daily revenue generated by the liquidity pool, accrued to the protocol.  */
  dailyProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  Daily revenue generated by the liquidity pool, accrued to the supply side.  */
  dailySupplySideRevenueUSD: Scalars['BigDecimal']
  /**  Daily revenue generated by the liquidity pool.  */
  dailyTotalRevenueUSD: Scalars['BigDecimal']
  /**  All trade volume occurred in a given day for a specific input token, in native amount. The ordering should be the same as the pool's `inputTokens` field.  */
  dailyVolumeByTokenAmount: Array<Scalars['BigInt']>
  /**  All trade volume occurred in a given day for a specific input token, in USD. The ordering should be the same as the pool's `inputTokens` field.  */
  dailyVolumeByTokenUSD: Array<Scalars['BigDecimal']>
  /**  All trade volume occurred in a given day, in USD  */
  dailyVolumeUSD: Scalars['BigDecimal']
  /**  { Smart contract address of the pool }-{ # of days since Unix epoch time }  */
  id: Scalars['ID']
  /**  Amount of input tokens in the pool. The ordering should be the same as the pool's `inputTokens` field.  */
  inputTokenBalances: Array<Scalars['BigInt']>
  /**  Weights of input tokens in the liquidity pool in percentage values. For example, 50/50 for Uniswap pools, 48.2/51.8 for a Curve pool, 10/10/80 for a Balancer pool  */
  inputTokenWeights: Array<Scalars['BigDecimal']>
  /**  Price per share of output token in USD  */
  outputTokenPriceUSD?: Maybe<Scalars['BigDecimal']>
  /**  Total supply of output token. Note that certain DEXes don't have an output token (e.g. Bancor)  */
  outputTokenSupply?: Maybe<Scalars['BigInt']>
  /**  The pool this snapshot belongs to  */
  pool: LiquidityPool
  /**  The protocol this snapshot belongs to  */
  protocol: DexAmmProtocol
  /**  Per-block reward token emission as of the current block normalized to a day, in token's native amount. This should be ideally calculated as the theoretical rate instead of the realized amount.  */
  rewardTokenEmissionsAmount?: Maybe<Array<Scalars['BigInt']>>
  /**  Per-block reward token emission as of the current block normalized to a day, in USD value. This should be ideally calculated as the theoretical rate instead of the realized amount.  */
  rewardTokenEmissionsUSD?: Maybe<Array<Scalars['BigDecimal']>>
  /**  Total supply of output tokens that are staked (usually in the MasterChef contract). Used to calculate reward APY.  */
  stakedOutputTokenAmount?: Maybe<Scalars['BigInt']>
  /**  Timestamp of this snapshot  */
  timestamp: Scalars['BigInt']
  /**  Current TVL (Total Value Locked) of this pool  */
  totalValueLockedUSD: Scalars['BigDecimal']
}

export type LiquidityPoolDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<LiquidityPoolDailySnapshot_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  cumulativeProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeSupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeSupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailyProtocolSideRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailySupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailySupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailySupplySideRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailyTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeByTokenAmount?: InputMaybe<Array<Scalars['BigInt']>>
  dailyVolumeByTokenAmount_contains?: InputMaybe<Array<Scalars['BigInt']>>
  dailyVolumeByTokenAmount_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  dailyVolumeByTokenAmount_not?: InputMaybe<Array<Scalars['BigInt']>>
  dailyVolumeByTokenAmount_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  dailyVolumeByTokenAmount_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  dailyVolumeByTokenUSD?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeByTokenUSD_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeByTokenUSD_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  dailyVolumeByTokenUSD_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeByTokenUSD_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeByTokenUSD_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  dailyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  dailyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  inputTokenBalances?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenWeights?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  or?: InputMaybe<Array<InputMaybe<LiquidityPoolDailySnapshot_Filter>>>
  outputTokenPriceUSD?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  outputTokenPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_not?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  outputTokenSupply?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_gt?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_gte?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputTokenSupply_lt?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_lte?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_not?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  pool?: InputMaybe<Scalars['String']>
  pool_?: InputMaybe<LiquidityPool_Filter>
  pool_contains?: InputMaybe<Scalars['String']>
  pool_contains_nocase?: InputMaybe<Scalars['String']>
  pool_ends_with?: InputMaybe<Scalars['String']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_gt?: InputMaybe<Scalars['String']>
  pool_gte?: InputMaybe<Scalars['String']>
  pool_in?: InputMaybe<Array<Scalars['String']>>
  pool_lt?: InputMaybe<Scalars['String']>
  pool_lte?: InputMaybe<Scalars['String']>
  pool_not?: InputMaybe<Scalars['String']>
  pool_not_contains?: InputMaybe<Scalars['String']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>
  pool_not_ends_with?: InputMaybe<Scalars['String']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_not_in?: InputMaybe<Array<Scalars['String']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool_starts_with?: InputMaybe<Scalars['String']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  rewardTokenEmissionsAmount?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_contains?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  rewardTokenEmissionsAmount_not?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  rewardTokenEmissionsUSD?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokenEmissionsUSD_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_not_contains?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokenEmissionsUSD_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  stakedOutputTokenAmount?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_gt?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_gte?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>
  stakedOutputTokenAmount_lt?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_lte?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_not?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
}

export enum LiquidityPoolDailySnapshot_OrderBy {
  BlockNumber = 'blockNumber',
  CumulativeProtocolSideRevenueUsd = 'cumulativeProtocolSideRevenueUSD',
  CumulativeSupplySideRevenueUsd = 'cumulativeSupplySideRevenueUSD',
  CumulativeTotalRevenueUsd = 'cumulativeTotalRevenueUSD',
  CumulativeVolumeUsd = 'cumulativeVolumeUSD',
  DailyProtocolSideRevenueUsd = 'dailyProtocolSideRevenueUSD',
  DailySupplySideRevenueUsd = 'dailySupplySideRevenueUSD',
  DailyTotalRevenueUsd = 'dailyTotalRevenueUSD',
  DailyVolumeByTokenAmount = 'dailyVolumeByTokenAmount',
  DailyVolumeByTokenUsd = 'dailyVolumeByTokenUSD',
  DailyVolumeUsd = 'dailyVolumeUSD',
  Id = 'id',
  InputTokenBalances = 'inputTokenBalances',
  InputTokenWeights = 'inputTokenWeights',
  OutputTokenPriceUsd = 'outputTokenPriceUSD',
  OutputTokenSupply = 'outputTokenSupply',
  Pool = 'pool',
  PoolCreatedBlockNumber = 'pool__createdBlockNumber',
  PoolCreatedTimestamp = 'pool__createdTimestamp',
  PoolCumulativeProtocolSideRevenueUsd = 'pool__cumulativeProtocolSideRevenueUSD',
  PoolCumulativeSupplySideRevenueUsd = 'pool__cumulativeSupplySideRevenueUSD',
  PoolCumulativeTotalRevenueUsd = 'pool__cumulativeTotalRevenueUSD',
  PoolCumulativeVolumeUsd = 'pool__cumulativeVolumeUSD',
  PoolId = 'pool__id',
  PoolIsSingleSided = 'pool__isSingleSided',
  PoolName = 'pool__name',
  PoolOutputTokenPriceUsd = 'pool__outputTokenPriceUSD',
  PoolOutputTokenSupply = 'pool__outputTokenSupply',
  PoolStakedOutputTokenAmount = 'pool__stakedOutputTokenAmount',
  PoolSymbol = 'pool__symbol',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  RewardTokenEmissionsAmount = 'rewardTokenEmissionsAmount',
  RewardTokenEmissionsUsd = 'rewardTokenEmissionsUSD',
  StakedOutputTokenAmount = 'stakedOutputTokenAmount',
  Timestamp = 'timestamp',
  TotalValueLockedUsd = 'totalValueLockedUSD',
}

export type LiquidityPoolFee = {
  __typename?: 'LiquidityPoolFee'
  /**  Fee as a percentage of the trade (swap) amount. Does not always apply  */
  feePercentage: Scalars['BigDecimal']
  /**  Type of fee this pool uses  */
  feeType: LiquidityPoolFeeType
  /**  { Fee type }-{ Pool address }  */
  id: Scalars['ID']
}

export enum LiquidityPoolFeeType {
  /**  One-time fee charged by the protocol during deposit, in percentages of the deposit token  */
  DepositFee = 'DEPOSIT_FEE',
  /**  Some protocols use dynamic LP fees (e.g., Bancor v2). Set `feePercentage` as 0 but handle the dynamic fees in the mapping code.  */
  DynamicLpFee = 'DYNAMIC_LP_FEE',
  /**  Some protocols use dynamic protocol fees (e.g., Bancor v2). Set `feePercentage` as 0 but handle the dynamic fees in the mapping code.  */
  DynamicProtocolFee = 'DYNAMIC_PROTOCOL_FEE',
  /**  Some protocols use dynamic fees instead of fixed fee (e.g. Balancer v2). Set `feePercentage` as 0 but handle the dynamic fees in the mapping code.  */
  DynamicTradingFee = 'DYNAMIC_TRADING_FEE',
  /**  Fixed fee that's paid to the LP, as a percentage of the traded amount. e.g. 0.25% for Sushiswap, 0.02% for Curve v1.  */
  FixedLpFee = 'FIXED_LP_FEE',
  /**  Fixed fee that's paid to the protocol, as a percentage of the traded amount. e.g. 0.05% for Sushiswap, 0.02% for Curve v1.  */
  FixedProtocolFee = 'FIXED_PROTOCOL_FEE',
  /**  Total fixed fee paid by the user per trade, as a percentage of the traded amount. e.g. 0.3% for Uniswap v2, 0.3% for Sushiswap, 0.04% for Curve v1.  */
  FixedTradingFee = 'FIXED_TRADING_FEE',
  /**  Some protocols use tiered fees instead of fixed fee (e.g. DYDX, DODO). Set `feePercentage` as 0 but handle the tiered fees in the mapping code.  */
  TieredTradingFee = 'TIERED_TRADING_FEE',
  /**  One-time fee charged by the protocol (e.g. Bancor v3) during withdrawal, in percentages of the withdrawal token  */
  WithdrawalFee = 'WITHDRAWAL_FEE',
}

export type LiquidityPoolFee_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<LiquidityPoolFee_Filter>>>
  feePercentage?: InputMaybe<Scalars['BigDecimal']>
  feePercentage_gt?: InputMaybe<Scalars['BigDecimal']>
  feePercentage_gte?: InputMaybe<Scalars['BigDecimal']>
  feePercentage_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  feePercentage_lt?: InputMaybe<Scalars['BigDecimal']>
  feePercentage_lte?: InputMaybe<Scalars['BigDecimal']>
  feePercentage_not?: InputMaybe<Scalars['BigDecimal']>
  feePercentage_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  feeType?: InputMaybe<LiquidityPoolFeeType>
  feeType_in?: InputMaybe<Array<LiquidityPoolFeeType>>
  feeType_not?: InputMaybe<LiquidityPoolFeeType>
  feeType_not_in?: InputMaybe<Array<LiquidityPoolFeeType>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<LiquidityPoolFee_Filter>>>
}

export enum LiquidityPoolFee_OrderBy {
  FeePercentage = 'feePercentage',
  FeeType = 'feeType',
  Id = 'id',
}

export type LiquidityPoolHourlySnapshot = {
  __typename?: 'LiquidityPoolHourlySnapshot'
  /**  Block number of this snapshot  */
  blockNumber: Scalars['BigInt']
  /**  All revenue generated by the liquidity pool, accrued to the protocol.  */
  cumulativeProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the liquidity pool, accrued to the supply side.  */
  cumulativeSupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the liquidity pool.  */
  cumulativeTotalRevenueUSD: Scalars['BigDecimal']
  /**  All historical trade volume occurred in this pool, in USD  */
  cumulativeVolumeUSD: Scalars['BigDecimal']
  /**  Hourly revenue generated by the liquidity pool, accrued to the protocol.  */
  hourlyProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  Hourly revenue generated by the liquidity pool, accrued to the supply side.  */
  hourlySupplySideRevenueUSD: Scalars['BigDecimal']
  /**  Hourly revenue generated by the liquidity pool.  */
  hourlyTotalRevenueUSD: Scalars['BigDecimal']
  /**  All trade volume occurred in a given hour for a specific input token, in native amount. The ordering should be the same as the pool's `inputTokens` field.  */
  hourlyVolumeByTokenAmount: Array<Scalars['BigInt']>
  /**  All trade volume occurred in a given hour for a specific input token, in USD. The ordering should be the same as the pool's `inputTokens` field.  */
  hourlyVolumeByTokenUSD: Array<Scalars['BigDecimal']>
  /**  All trade volume occurred in a given hour, in USD  */
  hourlyVolumeUSD: Scalars['BigDecimal']
  /**  { Smart contract address of the pool }-{ # of hours since Unix epoch time }  */
  id: Scalars['ID']
  /**  Amount of input tokens in the pool. The ordering should be the same as the pool's `inputTokens` field.  */
  inputTokenBalances: Array<Scalars['BigInt']>
  /**  Weights of input tokens in the liquidity pool in percentage values. For example, 50/50 for Uniswap pools, 48.2/51.8 for a Curve pool, 10/10/80 for a Balancer pool  */
  inputTokenWeights: Array<Scalars['BigDecimal']>
  /**  Price per share of output token in USD  */
  outputTokenPriceUSD?: Maybe<Scalars['BigDecimal']>
  /**  Total supply of output token. Note that certain DEXes don't have an output token (e.g. Bancor)  */
  outputTokenSupply?: Maybe<Scalars['BigInt']>
  /**  The pool this snapshot belongs to  */
  pool: LiquidityPool
  /**  The protocol this snapshot belongs to  */
  protocol: DexAmmProtocol
  /**  Per-block reward token emission as of the current block normalized to a day (not hour), in token's native amount. This should be ideally calculated as the theoretical rate instead of the realized amount.  */
  rewardTokenEmissionsAmount?: Maybe<Array<Scalars['BigInt']>>
  /**  Per-block reward token emission as of the current block normalized to a day (not hour), in USD value. This should be ideally calculated as the theoretical rate instead of the realized amount.  */
  rewardTokenEmissionsUSD?: Maybe<Array<Scalars['BigDecimal']>>
  /**  Total supply of output tokens that are staked (usually in the MasterChef contract). Used to calculate reward APY.  */
  stakedOutputTokenAmount?: Maybe<Scalars['BigInt']>
  /**  Timestamp of this snapshot  */
  timestamp: Scalars['BigInt']
  /**  Current TVL (Total Value Locked) of this pool  */
  totalValueLockedUSD: Scalars['BigDecimal']
}

export type LiquidityPoolHourlySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<LiquidityPoolHourlySnapshot_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  cumulativeProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeSupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeSupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  hourlyProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  hourlyProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  hourlyProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  hourlyProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  hourlyProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  hourlyProtocolSideRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlySupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  hourlySupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  hourlySupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  hourlySupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlySupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  hourlySupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  hourlySupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  hourlySupplySideRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  hourlyTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  hourlyTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  hourlyTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  hourlyTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  hourlyTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  hourlyTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyVolumeByTokenAmount?: InputMaybe<Array<Scalars['BigInt']>>
  hourlyVolumeByTokenAmount_contains?: InputMaybe<Array<Scalars['BigInt']>>
  hourlyVolumeByTokenAmount_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  hourlyVolumeByTokenAmount_not?: InputMaybe<Array<Scalars['BigInt']>>
  hourlyVolumeByTokenAmount_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  hourlyVolumeByTokenAmount_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  hourlyVolumeByTokenUSD?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyVolumeByTokenUSD_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyVolumeByTokenUSD_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  hourlyVolumeByTokenUSD_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyVolumeByTokenUSD_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyVolumeByTokenUSD_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  hourlyVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  hourlyVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  hourlyVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  hourlyVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  hourlyVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  hourlyVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  hourlyVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  hourlyVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  inputTokenBalances?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenWeights?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  or?: InputMaybe<Array<InputMaybe<LiquidityPoolHourlySnapshot_Filter>>>
  outputTokenPriceUSD?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  outputTokenPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_not?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  outputTokenSupply?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_gt?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_gte?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputTokenSupply_lt?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_lte?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_not?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  pool?: InputMaybe<Scalars['String']>
  pool_?: InputMaybe<LiquidityPool_Filter>
  pool_contains?: InputMaybe<Scalars['String']>
  pool_contains_nocase?: InputMaybe<Scalars['String']>
  pool_ends_with?: InputMaybe<Scalars['String']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_gt?: InputMaybe<Scalars['String']>
  pool_gte?: InputMaybe<Scalars['String']>
  pool_in?: InputMaybe<Array<Scalars['String']>>
  pool_lt?: InputMaybe<Scalars['String']>
  pool_lte?: InputMaybe<Scalars['String']>
  pool_not?: InputMaybe<Scalars['String']>
  pool_not_contains?: InputMaybe<Scalars['String']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>
  pool_not_ends_with?: InputMaybe<Scalars['String']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_not_in?: InputMaybe<Array<Scalars['String']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool_starts_with?: InputMaybe<Scalars['String']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  rewardTokenEmissionsAmount?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_contains?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  rewardTokenEmissionsAmount_not?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  rewardTokenEmissionsUSD?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokenEmissionsUSD_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_not_contains?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokenEmissionsUSD_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  stakedOutputTokenAmount?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_gt?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_gte?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>
  stakedOutputTokenAmount_lt?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_lte?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_not?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
}

export enum LiquidityPoolHourlySnapshot_OrderBy {
  BlockNumber = 'blockNumber',
  CumulativeProtocolSideRevenueUsd = 'cumulativeProtocolSideRevenueUSD',
  CumulativeSupplySideRevenueUsd = 'cumulativeSupplySideRevenueUSD',
  CumulativeTotalRevenueUsd = 'cumulativeTotalRevenueUSD',
  CumulativeVolumeUsd = 'cumulativeVolumeUSD',
  HourlyProtocolSideRevenueUsd = 'hourlyProtocolSideRevenueUSD',
  HourlySupplySideRevenueUsd = 'hourlySupplySideRevenueUSD',
  HourlyTotalRevenueUsd = 'hourlyTotalRevenueUSD',
  HourlyVolumeByTokenAmount = 'hourlyVolumeByTokenAmount',
  HourlyVolumeByTokenUsd = 'hourlyVolumeByTokenUSD',
  HourlyVolumeUsd = 'hourlyVolumeUSD',
  Id = 'id',
  InputTokenBalances = 'inputTokenBalances',
  InputTokenWeights = 'inputTokenWeights',
  OutputTokenPriceUsd = 'outputTokenPriceUSD',
  OutputTokenSupply = 'outputTokenSupply',
  Pool = 'pool',
  PoolCreatedBlockNumber = 'pool__createdBlockNumber',
  PoolCreatedTimestamp = 'pool__createdTimestamp',
  PoolCumulativeProtocolSideRevenueUsd = 'pool__cumulativeProtocolSideRevenueUSD',
  PoolCumulativeSupplySideRevenueUsd = 'pool__cumulativeSupplySideRevenueUSD',
  PoolCumulativeTotalRevenueUsd = 'pool__cumulativeTotalRevenueUSD',
  PoolCumulativeVolumeUsd = 'pool__cumulativeVolumeUSD',
  PoolId = 'pool__id',
  PoolIsSingleSided = 'pool__isSingleSided',
  PoolName = 'pool__name',
  PoolOutputTokenPriceUsd = 'pool__outputTokenPriceUSD',
  PoolOutputTokenSupply = 'pool__outputTokenSupply',
  PoolStakedOutputTokenAmount = 'pool__stakedOutputTokenAmount',
  PoolSymbol = 'pool__symbol',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  RewardTokenEmissionsAmount = 'rewardTokenEmissionsAmount',
  RewardTokenEmissionsUsd = 'rewardTokenEmissionsUSD',
  StakedOutputTokenAmount = 'stakedOutputTokenAmount',
  Timestamp = 'timestamp',
  TotalValueLockedUsd = 'totalValueLockedUSD',
}

export type LiquidityPool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<LiquidityPool_Filter>>>
  createdBlockNumber?: InputMaybe<Scalars['BigInt']>
  createdBlockNumber_gt?: InputMaybe<Scalars['BigInt']>
  createdBlockNumber_gte?: InputMaybe<Scalars['BigInt']>
  createdBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdBlockNumber_lt?: InputMaybe<Scalars['BigInt']>
  createdBlockNumber_lte?: InputMaybe<Scalars['BigInt']>
  createdBlockNumber_not?: InputMaybe<Scalars['BigInt']>
  createdBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdTimestamp?: InputMaybe<Scalars['BigInt']>
  createdTimestamp_gt?: InputMaybe<Scalars['BigInt']>
  createdTimestamp_gte?: InputMaybe<Scalars['BigInt']>
  createdTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdTimestamp_lt?: InputMaybe<Scalars['BigInt']>
  createdTimestamp_lte?: InputMaybe<Scalars['BigInt']>
  createdTimestamp_not?: InputMaybe<Scalars['BigInt']>
  createdTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  cumulativeProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeSupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeSupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  dailySnapshots_?: InputMaybe<LiquidityPoolDailySnapshot_Filter>
  deposits_?: InputMaybe<Deposit_Filter>
  fees?: InputMaybe<Array<Scalars['String']>>
  fees_?: InputMaybe<LiquidityPoolFee_Filter>
  fees_contains?: InputMaybe<Array<Scalars['String']>>
  fees_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  fees_not?: InputMaybe<Array<Scalars['String']>>
  fees_not_contains?: InputMaybe<Array<Scalars['String']>>
  fees_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  hourlySnapshots_?: InputMaybe<LiquidityPoolHourlySnapshot_Filter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  inputTokenBalances?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenBalances_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenWeights?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenWeights_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  inputTokens?: InputMaybe<Array<Scalars['String']>>
  inputTokens_?: InputMaybe<Token_Filter>
  inputTokens_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  isSingleSided?: InputMaybe<Scalars['Boolean']>
  isSingleSided_in?: InputMaybe<Array<Scalars['Boolean']>>
  isSingleSided_not?: InputMaybe<Scalars['Boolean']>
  isSingleSided_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<LiquidityPool_Filter>>>
  outputToken?: InputMaybe<Scalars['String']>
  outputTokenPriceUSD?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  outputTokenPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_not?: InputMaybe<Scalars['BigDecimal']>
  outputTokenPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  outputTokenSupply?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_gt?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_gte?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputTokenSupply_lt?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_lte?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_not?: InputMaybe<Scalars['BigInt']>
  outputTokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputToken_?: InputMaybe<Token_Filter>
  outputToken_contains?: InputMaybe<Scalars['String']>
  outputToken_contains_nocase?: InputMaybe<Scalars['String']>
  outputToken_ends_with?: InputMaybe<Scalars['String']>
  outputToken_ends_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_gt?: InputMaybe<Scalars['String']>
  outputToken_gte?: InputMaybe<Scalars['String']>
  outputToken_in?: InputMaybe<Array<Scalars['String']>>
  outputToken_lt?: InputMaybe<Scalars['String']>
  outputToken_lte?: InputMaybe<Scalars['String']>
  outputToken_not?: InputMaybe<Scalars['String']>
  outputToken_not_contains?: InputMaybe<Scalars['String']>
  outputToken_not_contains_nocase?: InputMaybe<Scalars['String']>
  outputToken_not_ends_with?: InputMaybe<Scalars['String']>
  outputToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_not_in?: InputMaybe<Array<Scalars['String']>>
  outputToken_not_starts_with?: InputMaybe<Scalars['String']>
  outputToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_starts_with?: InputMaybe<Scalars['String']>
  outputToken_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  rewardTokenEmissionsAmount?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_contains?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  rewardTokenEmissionsAmount_not?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  rewardTokenEmissionsAmount_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigInt']>
  >
  rewardTokenEmissionsUSD?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokenEmissionsUSD_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  rewardTokenEmissionsUSD_not_contains?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokenEmissionsUSD_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  rewardTokens?: InputMaybe<Array<Scalars['String']>>
  rewardTokens_?: InputMaybe<RewardToken_Filter>
  rewardTokens_contains?: InputMaybe<Array<Scalars['String']>>
  rewardTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  rewardTokens_not?: InputMaybe<Array<Scalars['String']>>
  rewardTokens_not_contains?: InputMaybe<Array<Scalars['String']>>
  rewardTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  stakedOutputTokenAmount?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_gt?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_gte?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>
  stakedOutputTokenAmount_lt?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_lte?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_not?: InputMaybe<Scalars['BigInt']>
  stakedOutputTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  swaps_?: InputMaybe<Swap_Filter>
  symbol?: InputMaybe<Scalars['String']>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_ends_with?: InputMaybe<Scalars['String']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  symbol_starts_with?: InputMaybe<Scalars['String']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  withdraws_?: InputMaybe<Withdraw_Filter>
}

export enum LiquidityPool_OrderBy {
  CreatedBlockNumber = 'createdBlockNumber',
  CreatedTimestamp = 'createdTimestamp',
  CumulativeProtocolSideRevenueUsd = 'cumulativeProtocolSideRevenueUSD',
  CumulativeSupplySideRevenueUsd = 'cumulativeSupplySideRevenueUSD',
  CumulativeTotalRevenueUsd = 'cumulativeTotalRevenueUSD',
  CumulativeVolumeUsd = 'cumulativeVolumeUSD',
  DailySnapshots = 'dailySnapshots',
  Deposits = 'deposits',
  Fees = 'fees',
  HourlySnapshots = 'hourlySnapshots',
  Id = 'id',
  InputTokenBalances = 'inputTokenBalances',
  InputTokenWeights = 'inputTokenWeights',
  InputTokens = 'inputTokens',
  IsSingleSided = 'isSingleSided',
  Name = 'name',
  OutputToken = 'outputToken',
  OutputTokenPriceUsd = 'outputTokenPriceUSD',
  OutputTokenSupply = 'outputTokenSupply',
  OutputTokenDecimals = 'outputToken__decimals',
  OutputTokenId = 'outputToken__id',
  OutputTokenLastPriceBlockNumber = 'outputToken__lastPriceBlockNumber',
  OutputTokenLastPriceUsd = 'outputToken__lastPriceUSD',
  OutputTokenName = 'outputToken__name',
  OutputTokenSymbol = 'outputToken__symbol',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  RewardTokenEmissionsAmount = 'rewardTokenEmissionsAmount',
  RewardTokenEmissionsUsd = 'rewardTokenEmissionsUSD',
  RewardTokens = 'rewardTokens',
  StakedOutputTokenAmount = 'stakedOutputTokenAmount',
  Swaps = 'swaps',
  Symbol = 'symbol',
  TotalValueLockedUsd = 'totalValueLockedUSD',
  Withdraws = 'withdraws',
}

export enum Network {
  ArbitrumOne = 'ARBITRUM_ONE',
  ArweaveMainnet = 'ARWEAVE_MAINNET',
  Aurora = 'AURORA',
  Avalanche = 'AVALANCHE',
  Boba = 'BOBA',
  Bsc = 'BSC',
  Celo = 'CELO',
  Cosmos = 'COSMOS',
  Cronos = 'CRONOS',
  Fantom = 'FANTOM',
  Fuse = 'FUSE',
  Harmony = 'HARMONY',
  Juno = 'JUNO',
  Mainnet = 'MAINNET',
  Matic = 'MATIC',
  Moonbeam = 'MOONBEAM',
  Moonriver = 'MOONRIVER',
  NearMainnet = 'NEAR_MAINNET',
  Optimism = 'OPTIMISM',
  Osmosis = 'OSMOSIS',
  Xdai = 'XDAI',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Protocol = {
  /**  Gross revenue for the protocol (revenue claimed by protocol). Examples: AMM protocol fee (Sushi’s 0.05%). OpenSea 10% sell fee.  */
  cumulativeProtocolSideRevenueUSD: Scalars['BigDecimal']
  /**  Revenue claimed by suppliers to the protocol. LPs on DEXs (e.g. 0.25% of the swap fee in Sushiswap). Depositors on Lending Protocols. NFT sellers on OpenSea.  */
  cumulativeSupplySideRevenueUSD: Scalars['BigDecimal']
  /**  All revenue generated by the protocol. e.g. 0.30% of swap fee in Sushiswap, all yield generated by Yearn.  */
  cumulativeTotalRevenueUSD: Scalars['BigDecimal']
  /**  Number of cumulative unique users  */
  cumulativeUniqueUsers: Scalars['Int']
  /**  Daily usage metrics for this protocol  */
  dailyUsageMetrics: Array<UsageMetricsDailySnapshot>
  /**  Daily financial metrics for this protocol  */
  financialMetrics: Array<FinancialsDailySnapshot>
  /**  Hourly usage metrics for this protocol  */
  hourlyUsageMetrics: Array<UsageMetricsHourlySnapshot>
  /**  Smart contract address of the protocol's main contract (Factory, Registry, etc)  */
  id: Scalars['ID']
  /**  Version of the methodology used to compute metrics, loosely based on SemVer format (e.g. 1.0.0)  */
  methodologyVersion: Scalars['String']
  /**  Name of the protocol, including version. e.g. Uniswap v3  */
  name: Scalars['String']
  /**  The blockchain network this subgraph is indexing on  */
  network: Network
  /**  Current PCV (Protocol Controlled Value). Only relevant for protocols with PCV.  */
  protocolControlledValueUSD?: Maybe<Scalars['BigDecimal']>
  /**  Version of the subgraph schema, in SemVer format (e.g. 1.0.0)  */
  schemaVersion: Scalars['String']
  /**  Slug of protocol, including version. e.g. uniswap-v3  */
  slug: Scalars['String']
  /**  Version of the subgraph implementation, in SemVer format (e.g. 1.0.0)  */
  subgraphVersion: Scalars['String']
  /**  Total number of pools  */
  totalPoolCount: Scalars['Int']
  /**  Current TVL (Total Value Locked) of the entire protocol  */
  totalValueLockedUSD: Scalars['BigDecimal']
  /**  The type of protocol (e.g. DEX, Lending, Yield, etc)  */
  type: ProtocolType
}

export type ProtocolDailyUsageMetricsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<UsageMetricsDailySnapshot_Filter>
}

export type ProtocolFinancialMetricsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<FinancialsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<FinancialsDailySnapshot_Filter>
}

export type ProtocolHourlyUsageMetricsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<UsageMetricsHourlySnapshot_Filter>
}

export enum ProtocolType {
  Bridge = 'BRIDGE',
  Exchange = 'EXCHANGE',
  Generic = 'GENERIC',
  Lending = 'LENDING',
  Yield = 'YIELD',
}

export type Protocol_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Protocol_Filter>>>
  cumulativeProtocolSideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeProtocolSideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeProtocolSideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeSupplySideRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeSupplySideRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeSupplySideRevenueUSD_not_in?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  cumulativeTotalRevenueUSD?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeTotalRevenueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  cumulativeTotalRevenueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  cumulativeUniqueUsers?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_in?: InputMaybe<Array<Scalars['Int']>>
  cumulativeUniqueUsers_lt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_lte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not_in?: InputMaybe<Array<Scalars['Int']>>
  dailyUsageMetrics_?: InputMaybe<UsageMetricsDailySnapshot_Filter>
  financialMetrics_?: InputMaybe<FinancialsDailySnapshot_Filter>
  hourlyUsageMetrics_?: InputMaybe<UsageMetricsHourlySnapshot_Filter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  methodologyVersion?: InputMaybe<Scalars['String']>
  methodologyVersion_contains?: InputMaybe<Scalars['String']>
  methodologyVersion_contains_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_ends_with?: InputMaybe<Scalars['String']>
  methodologyVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_gt?: InputMaybe<Scalars['String']>
  methodologyVersion_gte?: InputMaybe<Scalars['String']>
  methodologyVersion_in?: InputMaybe<Array<Scalars['String']>>
  methodologyVersion_lt?: InputMaybe<Scalars['String']>
  methodologyVersion_lte?: InputMaybe<Scalars['String']>
  methodologyVersion_not?: InputMaybe<Scalars['String']>
  methodologyVersion_not_contains?: InputMaybe<Scalars['String']>
  methodologyVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_not_ends_with?: InputMaybe<Scalars['String']>
  methodologyVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  methodologyVersion_not_starts_with?: InputMaybe<Scalars['String']>
  methodologyVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  methodologyVersion_starts_with?: InputMaybe<Scalars['String']>
  methodologyVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  network?: InputMaybe<Network>
  network_in?: InputMaybe<Array<Network>>
  network_not?: InputMaybe<Network>
  network_not_in?: InputMaybe<Array<Network>>
  or?: InputMaybe<Array<InputMaybe<Protocol_Filter>>>
  protocolControlledValueUSD?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  protocolControlledValueUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_not?: InputMaybe<Scalars['BigDecimal']>
  protocolControlledValueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  schemaVersion?: InputMaybe<Scalars['String']>
  schemaVersion_contains?: InputMaybe<Scalars['String']>
  schemaVersion_contains_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_ends_with?: InputMaybe<Scalars['String']>
  schemaVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_gt?: InputMaybe<Scalars['String']>
  schemaVersion_gte?: InputMaybe<Scalars['String']>
  schemaVersion_in?: InputMaybe<Array<Scalars['String']>>
  schemaVersion_lt?: InputMaybe<Scalars['String']>
  schemaVersion_lte?: InputMaybe<Scalars['String']>
  schemaVersion_not?: InputMaybe<Scalars['String']>
  schemaVersion_not_contains?: InputMaybe<Scalars['String']>
  schemaVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_not_ends_with?: InputMaybe<Scalars['String']>
  schemaVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  schemaVersion_not_starts_with?: InputMaybe<Scalars['String']>
  schemaVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  schemaVersion_starts_with?: InputMaybe<Scalars['String']>
  schemaVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
  slug_contains?: InputMaybe<Scalars['String']>
  slug_contains_nocase?: InputMaybe<Scalars['String']>
  slug_ends_with?: InputMaybe<Scalars['String']>
  slug_ends_with_nocase?: InputMaybe<Scalars['String']>
  slug_gt?: InputMaybe<Scalars['String']>
  slug_gte?: InputMaybe<Scalars['String']>
  slug_in?: InputMaybe<Array<Scalars['String']>>
  slug_lt?: InputMaybe<Scalars['String']>
  slug_lte?: InputMaybe<Scalars['String']>
  slug_not?: InputMaybe<Scalars['String']>
  slug_not_contains?: InputMaybe<Scalars['String']>
  slug_not_contains_nocase?: InputMaybe<Scalars['String']>
  slug_not_ends_with?: InputMaybe<Scalars['String']>
  slug_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  slug_not_in?: InputMaybe<Array<Scalars['String']>>
  slug_not_starts_with?: InputMaybe<Scalars['String']>
  slug_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  slug_starts_with?: InputMaybe<Scalars['String']>
  slug_starts_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion?: InputMaybe<Scalars['String']>
  subgraphVersion_contains?: InputMaybe<Scalars['String']>
  subgraphVersion_contains_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_ends_with?: InputMaybe<Scalars['String']>
  subgraphVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_gt?: InputMaybe<Scalars['String']>
  subgraphVersion_gte?: InputMaybe<Scalars['String']>
  subgraphVersion_in?: InputMaybe<Array<Scalars['String']>>
  subgraphVersion_lt?: InputMaybe<Scalars['String']>
  subgraphVersion_lte?: InputMaybe<Scalars['String']>
  subgraphVersion_not?: InputMaybe<Scalars['String']>
  subgraphVersion_not_contains?: InputMaybe<Scalars['String']>
  subgraphVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_not_ends_with?: InputMaybe<Scalars['String']>
  subgraphVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  subgraphVersion_not_starts_with?: InputMaybe<Scalars['String']>
  subgraphVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  subgraphVersion_starts_with?: InputMaybe<Scalars['String']>
  subgraphVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  totalPoolCount?: InputMaybe<Scalars['Int']>
  totalPoolCount_gt?: InputMaybe<Scalars['Int']>
  totalPoolCount_gte?: InputMaybe<Scalars['Int']>
  totalPoolCount_in?: InputMaybe<Array<Scalars['Int']>>
  totalPoolCount_lt?: InputMaybe<Scalars['Int']>
  totalPoolCount_lte?: InputMaybe<Scalars['Int']>
  totalPoolCount_not?: InputMaybe<Scalars['Int']>
  totalPoolCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  totalValueLockedUSD?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  totalValueLockedUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not?: InputMaybe<Scalars['BigDecimal']>
  totalValueLockedUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  type?: InputMaybe<ProtocolType>
  type_in?: InputMaybe<Array<ProtocolType>>
  type_not?: InputMaybe<ProtocolType>
  type_not_in?: InputMaybe<Array<ProtocolType>>
}

export enum Protocol_OrderBy {
  CumulativeProtocolSideRevenueUsd = 'cumulativeProtocolSideRevenueUSD',
  CumulativeSupplySideRevenueUsd = 'cumulativeSupplySideRevenueUSD',
  CumulativeTotalRevenueUsd = 'cumulativeTotalRevenueUSD',
  CumulativeUniqueUsers = 'cumulativeUniqueUsers',
  DailyUsageMetrics = 'dailyUsageMetrics',
  FinancialMetrics = 'financialMetrics',
  HourlyUsageMetrics = 'hourlyUsageMetrics',
  Id = 'id',
  MethodologyVersion = 'methodologyVersion',
  Name = 'name',
  Network = 'network',
  ProtocolControlledValueUsd = 'protocolControlledValueUSD',
  SchemaVersion = 'schemaVersion',
  Slug = 'slug',
  SubgraphVersion = 'subgraphVersion',
  TotalPoolCount = 'totalPoolCount',
  TotalValueLockedUsd = 'totalValueLockedUSD',
  Type = 'type',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  account?: Maybe<Account>
  accounts: Array<Account>
  activeAccount?: Maybe<ActiveAccount>
  activeAccounts: Array<ActiveAccount>
  deposit?: Maybe<Deposit>
  deposits: Array<Deposit>
  dexAmmProtocol?: Maybe<DexAmmProtocol>
  dexAmmProtocols: Array<DexAmmProtocol>
  event?: Maybe<Event>
  events: Array<Event>
  financialsDailySnapshot?: Maybe<FinancialsDailySnapshot>
  financialsDailySnapshots: Array<FinancialsDailySnapshot>
  helperStore?: Maybe<_HelperStore>
  helperStores: Array<_HelperStore>
  liquidityPool?: Maybe<LiquidityPool>
  liquidityPoolAmount?: Maybe<_LiquidityPoolAmount>
  liquidityPoolAmounts: Array<_LiquidityPoolAmount>
  liquidityPoolDailySnapshot?: Maybe<LiquidityPoolDailySnapshot>
  liquidityPoolDailySnapshots: Array<LiquidityPoolDailySnapshot>
  liquidityPoolFee?: Maybe<LiquidityPoolFee>
  liquidityPoolFees: Array<LiquidityPoolFee>
  liquidityPoolHourlySnapshot?: Maybe<LiquidityPoolHourlySnapshot>
  liquidityPoolHourlySnapshots: Array<LiquidityPoolHourlySnapshot>
  liquidityPools: Array<LiquidityPool>
  protocol?: Maybe<Protocol>
  protocols: Array<Protocol>
  rewardToken?: Maybe<RewardToken>
  rewardTokens: Array<RewardToken>
  swap?: Maybe<Swap>
  swaps: Array<Swap>
  token?: Maybe<Token>
  tokenWhitelist?: Maybe<_TokenWhitelist>
  tokenWhitelists: Array<_TokenWhitelist>
  tokens: Array<Token>
  usageMetricsDailySnapshot?: Maybe<UsageMetricsDailySnapshot>
  usageMetricsDailySnapshots: Array<UsageMetricsDailySnapshot>
  usageMetricsHourlySnapshot?: Maybe<UsageMetricsHourlySnapshot>
  usageMetricsHourlySnapshots: Array<UsageMetricsHourlySnapshot>
  withdraw?: Maybe<Withdraw>
  withdraws: Array<Withdraw>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Account_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Account_Filter>
}

export type QueryActiveAccountArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryActiveAccountsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ActiveAccount_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ActiveAccount_Filter>
}

export type QueryDepositArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryDepositsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Deposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Deposit_Filter>
}

export type QueryDexAmmProtocolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryDexAmmProtocolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DexAmmProtocol_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<DexAmmProtocol_Filter>
}

export type QueryEventArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryEventsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Event_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Event_Filter>
}

export type QueryFinancialsDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryFinancialsDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<FinancialsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<FinancialsDailySnapshot_Filter>
}

export type QueryHelperStoreArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryHelperStoresArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<_HelperStore_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<_HelperStore_Filter>
}

export type QueryLiquidityPoolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidityPoolAmountArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidityPoolAmountsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<_LiquidityPoolAmount_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<_LiquidityPoolAmount_Filter>
}

export type QueryLiquidityPoolDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidityPoolDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPoolDailySnapshot_Filter>
}

export type QueryLiquidityPoolFeeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidityPoolFeesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolFee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPoolFee_Filter>
}

export type QueryLiquidityPoolHourlySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryLiquidityPoolHourlySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPoolHourlySnapshot_Filter>
}

export type QueryLiquidityPoolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPool_Filter>
}

export type QueryProtocolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryProtocolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Protocol_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Protocol_Filter>
}

export type QueryRewardTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardToken_Filter>
}

export type QuerySwapArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySwapsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Swap_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Swap_Filter>
}

export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenWhitelistArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenWhitelistsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<_TokenWhitelist_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<_TokenWhitelist_Filter>
}

export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type QueryUsageMetricsDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUsageMetricsDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<UsageMetricsDailySnapshot_Filter>
}

export type QueryUsageMetricsHourlySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUsageMetricsHourlySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<UsageMetricsHourlySnapshot_Filter>
}

export type QueryWithdrawArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryWithdrawsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Withdraw_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Withdraw_Filter>
}

export type RewardToken = {
  __typename?: 'RewardToken'
  /**  { Reward token type }-{ Smart contract address of the reward token }  */
  id: Scalars['ID']
  /**  Reference to the actual token  */
  token: Token
  /**  The type of the reward token  */
  type: RewardTokenType
}

export enum RewardTokenType {
  /**  For reward tokens awarded to borrowers  */
  Borrow = 'BORROW',
  /**  For reward tokens awarded to LPs/lenders  */
  Deposit = 'DEPOSIT',
}

export type RewardToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<RewardToken_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardToken_Filter>>>
  token?: InputMaybe<Scalars['String']>
  token_?: InputMaybe<Token_Filter>
  token_contains?: InputMaybe<Scalars['String']>
  token_contains_nocase?: InputMaybe<Scalars['String']>
  token_ends_with?: InputMaybe<Scalars['String']>
  token_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_gt?: InputMaybe<Scalars['String']>
  token_gte?: InputMaybe<Scalars['String']>
  token_in?: InputMaybe<Array<Scalars['String']>>
  token_lt?: InputMaybe<Scalars['String']>
  token_lte?: InputMaybe<Scalars['String']>
  token_not?: InputMaybe<Scalars['String']>
  token_not_contains?: InputMaybe<Scalars['String']>
  token_not_contains_nocase?: InputMaybe<Scalars['String']>
  token_not_ends_with?: InputMaybe<Scalars['String']>
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  token_not_in?: InputMaybe<Array<Scalars['String']>>
  token_not_starts_with?: InputMaybe<Scalars['String']>
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  token_starts_with?: InputMaybe<Scalars['String']>
  token_starts_with_nocase?: InputMaybe<Scalars['String']>
  type?: InputMaybe<RewardTokenType>
  type_in?: InputMaybe<Array<RewardTokenType>>
  type_not?: InputMaybe<RewardTokenType>
  type_not_in?: InputMaybe<Array<RewardTokenType>>
}

export enum RewardToken_OrderBy {
  Id = 'id',
  Token = 'token',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenLastPriceBlockNumber = 'token__lastPriceBlockNumber',
  TokenLastPriceUsd = 'token__lastPriceUSD',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  Type = 'type',
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  account?: Maybe<Account>
  accounts: Array<Account>
  activeAccount?: Maybe<ActiveAccount>
  activeAccounts: Array<ActiveAccount>
  deposit?: Maybe<Deposit>
  deposits: Array<Deposit>
  dexAmmProtocol?: Maybe<DexAmmProtocol>
  dexAmmProtocols: Array<DexAmmProtocol>
  event?: Maybe<Event>
  events: Array<Event>
  financialsDailySnapshot?: Maybe<FinancialsDailySnapshot>
  financialsDailySnapshots: Array<FinancialsDailySnapshot>
  helperStore?: Maybe<_HelperStore>
  helperStores: Array<_HelperStore>
  liquidityPool?: Maybe<LiquidityPool>
  liquidityPoolAmount?: Maybe<_LiquidityPoolAmount>
  liquidityPoolAmounts: Array<_LiquidityPoolAmount>
  liquidityPoolDailySnapshot?: Maybe<LiquidityPoolDailySnapshot>
  liquidityPoolDailySnapshots: Array<LiquidityPoolDailySnapshot>
  liquidityPoolFee?: Maybe<LiquidityPoolFee>
  liquidityPoolFees: Array<LiquidityPoolFee>
  liquidityPoolHourlySnapshot?: Maybe<LiquidityPoolHourlySnapshot>
  liquidityPoolHourlySnapshots: Array<LiquidityPoolHourlySnapshot>
  liquidityPools: Array<LiquidityPool>
  protocol?: Maybe<Protocol>
  protocols: Array<Protocol>
  rewardToken?: Maybe<RewardToken>
  rewardTokens: Array<RewardToken>
  swap?: Maybe<Swap>
  swaps: Array<Swap>
  token?: Maybe<Token>
  tokenWhitelist?: Maybe<_TokenWhitelist>
  tokenWhitelists: Array<_TokenWhitelist>
  tokens: Array<Token>
  usageMetricsDailySnapshot?: Maybe<UsageMetricsDailySnapshot>
  usageMetricsDailySnapshots: Array<UsageMetricsDailySnapshot>
  usageMetricsHourlySnapshot?: Maybe<UsageMetricsHourlySnapshot>
  usageMetricsHourlySnapshots: Array<UsageMetricsHourlySnapshot>
  withdraw?: Maybe<Withdraw>
  withdraws: Array<Withdraw>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Account_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Account_Filter>
}

export type SubscriptionActiveAccountArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionActiveAccountsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ActiveAccount_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ActiveAccount_Filter>
}

export type SubscriptionDepositArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionDepositsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Deposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Deposit_Filter>
}

export type SubscriptionDexAmmProtocolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionDexAmmProtocolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DexAmmProtocol_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<DexAmmProtocol_Filter>
}

export type SubscriptionEventArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionEventsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Event_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Event_Filter>
}

export type SubscriptionFinancialsDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionFinancialsDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<FinancialsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<FinancialsDailySnapshot_Filter>
}

export type SubscriptionHelperStoreArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionHelperStoresArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<_HelperStore_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<_HelperStore_Filter>
}

export type SubscriptionLiquidityPoolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidityPoolAmountArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidityPoolAmountsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<_LiquidityPoolAmount_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<_LiquidityPoolAmount_Filter>
}

export type SubscriptionLiquidityPoolDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidityPoolDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPoolDailySnapshot_Filter>
}

export type SubscriptionLiquidityPoolFeeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidityPoolFeesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolFee_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPoolFee_Filter>
}

export type SubscriptionLiquidityPoolHourlySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionLiquidityPoolHourlySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPoolHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPoolHourlySnapshot_Filter>
}

export type SubscriptionLiquidityPoolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<LiquidityPool_Filter>
}

export type SubscriptionProtocolArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionProtocolsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Protocol_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Protocol_Filter>
}

export type SubscriptionRewardTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardToken_Filter>
}

export type SubscriptionSwapArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSwapsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Swap_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Swap_Filter>
}

export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenWhitelistArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenWhitelistsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<_TokenWhitelist_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<_TokenWhitelist_Filter>
}

export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token_Filter>
}

export type SubscriptionUsageMetricsDailySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUsageMetricsDailySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsDailySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<UsageMetricsDailySnapshot_Filter>
}

export type SubscriptionUsageMetricsHourlySnapshotArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUsageMetricsHourlySnapshotsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<UsageMetricsHourlySnapshot_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<UsageMetricsHourlySnapshot_Filter>
}

export type SubscriptionWithdrawArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionWithdrawsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Withdraw_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Withdraw_Filter>
}

export type Swap = {
  __typename?: 'Swap'
  /**  Amount of token deposited into pool in native units  */
  amountIn: Scalars['BigInt']
  /**  Amount of token deposited into pool in USD  */
  amountInUSD: Scalars['BigDecimal']
  /**  Amount of token withdrawn from pool in native units  */
  amountOut: Scalars['BigInt']
  /**  Amount of token withdrawn from pool in USD  */
  amountOutUSD: Scalars['BigDecimal']
  /**  Block number of this event  */
  blockNumber: Scalars['BigInt']
  /**  Address that sent the tokens  */
  from: Scalars['String']
  /**  Transaction hash of the transaction that emitted this event  */
  hash: Scalars['String']
  /**  swap-{ Transaction hash }-{ Log index }  */
  id: Scalars['ID']
  /**  Event log index. For transactions that don't emit event, create arbitrary index starting from 0  */
  logIndex: Scalars['Int']
  /**  The pool involving this transaction  */
  pool: LiquidityPool
  /**  The protocol this transaction belongs to  */
  protocol: DexAmmProtocol
  /**  Timestamp of this event  */
  timestamp: Scalars['BigInt']
  /**  Address that received the tokens  */
  to: Scalars['String']
  /**  Token deposited into pool  */
  tokenIn: Token
  /**  Token withdrawn from pool  */
  tokenOut: Token
}

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amountIn?: InputMaybe<Scalars['BigInt']>
  amountInUSD?: InputMaybe<Scalars['BigDecimal']>
  amountInUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  amountInUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  amountInUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  amountInUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  amountInUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  amountInUSD_not?: InputMaybe<Scalars['BigDecimal']>
  amountInUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  amountIn_gt?: InputMaybe<Scalars['BigInt']>
  amountIn_gte?: InputMaybe<Scalars['BigInt']>
  amountIn_in?: InputMaybe<Array<Scalars['BigInt']>>
  amountIn_lt?: InputMaybe<Scalars['BigInt']>
  amountIn_lte?: InputMaybe<Scalars['BigInt']>
  amountIn_not?: InputMaybe<Scalars['BigInt']>
  amountIn_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  amountOut?: InputMaybe<Scalars['BigInt']>
  amountOutUSD?: InputMaybe<Scalars['BigDecimal']>
  amountOutUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  amountOutUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  amountOutUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  amountOutUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  amountOutUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  amountOutUSD_not?: InputMaybe<Scalars['BigDecimal']>
  amountOutUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  amountOut_gt?: InputMaybe<Scalars['BigInt']>
  amountOut_gte?: InputMaybe<Scalars['BigInt']>
  amountOut_in?: InputMaybe<Array<Scalars['BigInt']>>
  amountOut_lt?: InputMaybe<Scalars['BigInt']>
  amountOut_lte?: InputMaybe<Scalars['BigInt']>
  amountOut_not?: InputMaybe<Scalars['BigInt']>
  amountOut_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<Swap_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['String']>
  from_contains?: InputMaybe<Scalars['String']>
  from_contains_nocase?: InputMaybe<Scalars['String']>
  from_ends_with?: InputMaybe<Scalars['String']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_gt?: InputMaybe<Scalars['String']>
  from_gte?: InputMaybe<Scalars['String']>
  from_in?: InputMaybe<Array<Scalars['String']>>
  from_lt?: InputMaybe<Scalars['String']>
  from_lte?: InputMaybe<Scalars['String']>
  from_not?: InputMaybe<Scalars['String']>
  from_not_contains?: InputMaybe<Scalars['String']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']>
  from_not_ends_with?: InputMaybe<Scalars['String']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_not_in?: InputMaybe<Array<Scalars['String']>>
  from_not_starts_with?: InputMaybe<Scalars['String']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  from_starts_with?: InputMaybe<Scalars['String']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash?: InputMaybe<Scalars['String']>
  hash_contains?: InputMaybe<Scalars['String']>
  hash_contains_nocase?: InputMaybe<Scalars['String']>
  hash_ends_with?: InputMaybe<Scalars['String']>
  hash_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_gt?: InputMaybe<Scalars['String']>
  hash_gte?: InputMaybe<Scalars['String']>
  hash_in?: InputMaybe<Array<Scalars['String']>>
  hash_lt?: InputMaybe<Scalars['String']>
  hash_lte?: InputMaybe<Scalars['String']>
  hash_not?: InputMaybe<Scalars['String']>
  hash_not_contains?: InputMaybe<Scalars['String']>
  hash_not_contains_nocase?: InputMaybe<Scalars['String']>
  hash_not_ends_with?: InputMaybe<Scalars['String']>
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_not_in?: InputMaybe<Array<Scalars['String']>>
  hash_not_starts_with?: InputMaybe<Scalars['String']>
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash_starts_with?: InputMaybe<Scalars['String']>
  hash_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  logIndex?: InputMaybe<Scalars['Int']>
  logIndex_gt?: InputMaybe<Scalars['Int']>
  logIndex_gte?: InputMaybe<Scalars['Int']>
  logIndex_in?: InputMaybe<Array<Scalars['Int']>>
  logIndex_lt?: InputMaybe<Scalars['Int']>
  logIndex_lte?: InputMaybe<Scalars['Int']>
  logIndex_not?: InputMaybe<Scalars['Int']>
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']>>
  or?: InputMaybe<Array<InputMaybe<Swap_Filter>>>
  pool?: InputMaybe<Scalars['String']>
  pool_?: InputMaybe<LiquidityPool_Filter>
  pool_contains?: InputMaybe<Scalars['String']>
  pool_contains_nocase?: InputMaybe<Scalars['String']>
  pool_ends_with?: InputMaybe<Scalars['String']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_gt?: InputMaybe<Scalars['String']>
  pool_gte?: InputMaybe<Scalars['String']>
  pool_in?: InputMaybe<Array<Scalars['String']>>
  pool_lt?: InputMaybe<Scalars['String']>
  pool_lte?: InputMaybe<Scalars['String']>
  pool_not?: InputMaybe<Scalars['String']>
  pool_not_contains?: InputMaybe<Scalars['String']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>
  pool_not_ends_with?: InputMaybe<Scalars['String']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_not_in?: InputMaybe<Array<Scalars['String']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool_starts_with?: InputMaybe<Scalars['String']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['String']>
  to_contains?: InputMaybe<Scalars['String']>
  to_contains_nocase?: InputMaybe<Scalars['String']>
  to_ends_with?: InputMaybe<Scalars['String']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_gt?: InputMaybe<Scalars['String']>
  to_gte?: InputMaybe<Scalars['String']>
  to_in?: InputMaybe<Array<Scalars['String']>>
  to_lt?: InputMaybe<Scalars['String']>
  to_lte?: InputMaybe<Scalars['String']>
  to_not?: InputMaybe<Scalars['String']>
  to_not_contains?: InputMaybe<Scalars['String']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']>
  to_not_ends_with?: InputMaybe<Scalars['String']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_not_in?: InputMaybe<Array<Scalars['String']>>
  to_not_starts_with?: InputMaybe<Scalars['String']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  to_starts_with?: InputMaybe<Scalars['String']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenIn?: InputMaybe<Scalars['String']>
  tokenIn_?: InputMaybe<Token_Filter>
  tokenIn_contains?: InputMaybe<Scalars['String']>
  tokenIn_contains_nocase?: InputMaybe<Scalars['String']>
  tokenIn_ends_with?: InputMaybe<Scalars['String']>
  tokenIn_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenIn_gt?: InputMaybe<Scalars['String']>
  tokenIn_gte?: InputMaybe<Scalars['String']>
  tokenIn_in?: InputMaybe<Array<Scalars['String']>>
  tokenIn_lt?: InputMaybe<Scalars['String']>
  tokenIn_lte?: InputMaybe<Scalars['String']>
  tokenIn_not?: InputMaybe<Scalars['String']>
  tokenIn_not_contains?: InputMaybe<Scalars['String']>
  tokenIn_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenIn_not_ends_with?: InputMaybe<Scalars['String']>
  tokenIn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenIn_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenIn_not_starts_with?: InputMaybe<Scalars['String']>
  tokenIn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenIn_starts_with?: InputMaybe<Scalars['String']>
  tokenIn_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenOut?: InputMaybe<Scalars['String']>
  tokenOut_?: InputMaybe<Token_Filter>
  tokenOut_contains?: InputMaybe<Scalars['String']>
  tokenOut_contains_nocase?: InputMaybe<Scalars['String']>
  tokenOut_ends_with?: InputMaybe<Scalars['String']>
  tokenOut_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenOut_gt?: InputMaybe<Scalars['String']>
  tokenOut_gte?: InputMaybe<Scalars['String']>
  tokenOut_in?: InputMaybe<Array<Scalars['String']>>
  tokenOut_lt?: InputMaybe<Scalars['String']>
  tokenOut_lte?: InputMaybe<Scalars['String']>
  tokenOut_not?: InputMaybe<Scalars['String']>
  tokenOut_not_contains?: InputMaybe<Scalars['String']>
  tokenOut_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenOut_not_ends_with?: InputMaybe<Scalars['String']>
  tokenOut_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenOut_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenOut_not_starts_with?: InputMaybe<Scalars['String']>
  tokenOut_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenOut_starts_with?: InputMaybe<Scalars['String']>
  tokenOut_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Swap_OrderBy {
  AmountIn = 'amountIn',
  AmountInUsd = 'amountInUSD',
  AmountOut = 'amountOut',
  AmountOutUsd = 'amountOutUSD',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  LogIndex = 'logIndex',
  Pool = 'pool',
  PoolCreatedBlockNumber = 'pool__createdBlockNumber',
  PoolCreatedTimestamp = 'pool__createdTimestamp',
  PoolCumulativeProtocolSideRevenueUsd = 'pool__cumulativeProtocolSideRevenueUSD',
  PoolCumulativeSupplySideRevenueUsd = 'pool__cumulativeSupplySideRevenueUSD',
  PoolCumulativeTotalRevenueUsd = 'pool__cumulativeTotalRevenueUSD',
  PoolCumulativeVolumeUsd = 'pool__cumulativeVolumeUSD',
  PoolId = 'pool__id',
  PoolIsSingleSided = 'pool__isSingleSided',
  PoolName = 'pool__name',
  PoolOutputTokenPriceUsd = 'pool__outputTokenPriceUSD',
  PoolOutputTokenSupply = 'pool__outputTokenSupply',
  PoolStakedOutputTokenAmount = 'pool__stakedOutputTokenAmount',
  PoolSymbol = 'pool__symbol',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
  To = 'to',
  TokenIn = 'tokenIn',
  TokenInDecimals = 'tokenIn__decimals',
  TokenInId = 'tokenIn__id',
  TokenInLastPriceBlockNumber = 'tokenIn__lastPriceBlockNumber',
  TokenInLastPriceUsd = 'tokenIn__lastPriceUSD',
  TokenInName = 'tokenIn__name',
  TokenInSymbol = 'tokenIn__symbol',
  TokenOut = 'tokenOut',
  TokenOutDecimals = 'tokenOut__decimals',
  TokenOutId = 'tokenOut__id',
  TokenOutLastPriceBlockNumber = 'tokenOut__lastPriceBlockNumber',
  TokenOutLastPriceUsd = 'tokenOut__lastPriceUSD',
  TokenOutName = 'tokenOut__name',
  TokenOutSymbol = 'tokenOut__symbol',
}

export type Token = {
  __typename?: 'Token'
  /**  The number of decimal places this token uses, default to 18  */
  decimals: Scalars['Int']
  /**  Smart contract address of the token  */
  id: Scalars['ID']
  /**  Optional field to track the block number of the last token price  */
  lastPriceBlockNumber?: Maybe<Scalars['BigInt']>
  /**  Optional field to track the price of a token, mostly for caching purposes  */
  lastPriceUSD?: Maybe<Scalars['BigDecimal']>
  /**  Name of the token, mirrored from the smart contract  */
  name: Scalars['String']
  /**  Symbol of the token, mirrored from the smart contract  */
  symbol: Scalars['String']
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  decimals?: InputMaybe<Scalars['Int']>
  decimals_gt?: InputMaybe<Scalars['Int']>
  decimals_gte?: InputMaybe<Scalars['Int']>
  decimals_in?: InputMaybe<Array<Scalars['Int']>>
  decimals_lt?: InputMaybe<Scalars['Int']>
  decimals_lte?: InputMaybe<Scalars['Int']>
  decimals_not?: InputMaybe<Scalars['Int']>
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  lastPriceBlockNumber?: InputMaybe<Scalars['BigInt']>
  lastPriceBlockNumber_gt?: InputMaybe<Scalars['BigInt']>
  lastPriceBlockNumber_gte?: InputMaybe<Scalars['BigInt']>
  lastPriceBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  lastPriceBlockNumber_lt?: InputMaybe<Scalars['BigInt']>
  lastPriceBlockNumber_lte?: InputMaybe<Scalars['BigInt']>
  lastPriceBlockNumber_not?: InputMaybe<Scalars['BigInt']>
  lastPriceBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  lastPriceUSD?: InputMaybe<Scalars['BigDecimal']>
  lastPriceUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  lastPriceUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  lastPriceUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  lastPriceUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  lastPriceUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  lastPriceUSD_not?: InputMaybe<Scalars['BigDecimal']>
  lastPriceUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>
  symbol?: InputMaybe<Scalars['String']>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_ends_with?: InputMaybe<Scalars['String']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  symbol_starts_with?: InputMaybe<Scalars['String']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Token_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  LastPriceBlockNumber = 'lastPriceBlockNumber',
  LastPriceUsd = 'lastPriceUSD',
  Name = 'name',
  Symbol = 'symbol',
}

export type UsageMetricsDailySnapshot = {
  __typename?: 'UsageMetricsDailySnapshot'
  /**  Block number of this snapshot  */
  blockNumber: Scalars['BigInt']
  /**  Number of cumulative unique users  */
  cumulativeUniqueUsers: Scalars['Int']
  /**  Number of unique daily active users  */
  dailyActiveUsers: Scalars['Int']
  /**  Total number of deposits (add liquidity) in a day  */
  dailyDepositCount: Scalars['Int']
  /**  Total number of trades (swaps) in a day  */
  dailySwapCount: Scalars['Int']
  /**  Total number of transactions occurred in a day. Transactions include all entities that implement the Event interface.  */
  dailyTransactionCount: Scalars['Int']
  /**  Total number of withdrawals (remove liquidity) in a day  */
  dailyWithdrawCount: Scalars['Int']
  /**  ID is # of days since Unix epoch time  */
  id: Scalars['ID']
  /**  Protocol this snapshot is associated with  */
  protocol: DexAmmProtocol
  /**  Timestamp of this snapshot  */
  timestamp: Scalars['BigInt']
  /**  Total number of pools  */
  totalPoolCount: Scalars['Int']
}

export type UsageMetricsDailySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<UsageMetricsDailySnapshot_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  cumulativeUniqueUsers?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_in?: InputMaybe<Array<Scalars['Int']>>
  cumulativeUniqueUsers_lt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_lte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not_in?: InputMaybe<Array<Scalars['Int']>>
  dailyActiveUsers?: InputMaybe<Scalars['Int']>
  dailyActiveUsers_gt?: InputMaybe<Scalars['Int']>
  dailyActiveUsers_gte?: InputMaybe<Scalars['Int']>
  dailyActiveUsers_in?: InputMaybe<Array<Scalars['Int']>>
  dailyActiveUsers_lt?: InputMaybe<Scalars['Int']>
  dailyActiveUsers_lte?: InputMaybe<Scalars['Int']>
  dailyActiveUsers_not?: InputMaybe<Scalars['Int']>
  dailyActiveUsers_not_in?: InputMaybe<Array<Scalars['Int']>>
  dailyDepositCount?: InputMaybe<Scalars['Int']>
  dailyDepositCount_gt?: InputMaybe<Scalars['Int']>
  dailyDepositCount_gte?: InputMaybe<Scalars['Int']>
  dailyDepositCount_in?: InputMaybe<Array<Scalars['Int']>>
  dailyDepositCount_lt?: InputMaybe<Scalars['Int']>
  dailyDepositCount_lte?: InputMaybe<Scalars['Int']>
  dailyDepositCount_not?: InputMaybe<Scalars['Int']>
  dailyDepositCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  dailySwapCount?: InputMaybe<Scalars['Int']>
  dailySwapCount_gt?: InputMaybe<Scalars['Int']>
  dailySwapCount_gte?: InputMaybe<Scalars['Int']>
  dailySwapCount_in?: InputMaybe<Array<Scalars['Int']>>
  dailySwapCount_lt?: InputMaybe<Scalars['Int']>
  dailySwapCount_lte?: InputMaybe<Scalars['Int']>
  dailySwapCount_not?: InputMaybe<Scalars['Int']>
  dailySwapCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  dailyTransactionCount?: InputMaybe<Scalars['Int']>
  dailyTransactionCount_gt?: InputMaybe<Scalars['Int']>
  dailyTransactionCount_gte?: InputMaybe<Scalars['Int']>
  dailyTransactionCount_in?: InputMaybe<Array<Scalars['Int']>>
  dailyTransactionCount_lt?: InputMaybe<Scalars['Int']>
  dailyTransactionCount_lte?: InputMaybe<Scalars['Int']>
  dailyTransactionCount_not?: InputMaybe<Scalars['Int']>
  dailyTransactionCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  dailyWithdrawCount?: InputMaybe<Scalars['Int']>
  dailyWithdrawCount_gt?: InputMaybe<Scalars['Int']>
  dailyWithdrawCount_gte?: InputMaybe<Scalars['Int']>
  dailyWithdrawCount_in?: InputMaybe<Array<Scalars['Int']>>
  dailyWithdrawCount_lt?: InputMaybe<Scalars['Int']>
  dailyWithdrawCount_lte?: InputMaybe<Scalars['Int']>
  dailyWithdrawCount_not?: InputMaybe<Scalars['Int']>
  dailyWithdrawCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<UsageMetricsDailySnapshot_Filter>>>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalPoolCount?: InputMaybe<Scalars['Int']>
  totalPoolCount_gt?: InputMaybe<Scalars['Int']>
  totalPoolCount_gte?: InputMaybe<Scalars['Int']>
  totalPoolCount_in?: InputMaybe<Array<Scalars['Int']>>
  totalPoolCount_lt?: InputMaybe<Scalars['Int']>
  totalPoolCount_lte?: InputMaybe<Scalars['Int']>
  totalPoolCount_not?: InputMaybe<Scalars['Int']>
  totalPoolCount_not_in?: InputMaybe<Array<Scalars['Int']>>
}

export enum UsageMetricsDailySnapshot_OrderBy {
  BlockNumber = 'blockNumber',
  CumulativeUniqueUsers = 'cumulativeUniqueUsers',
  DailyActiveUsers = 'dailyActiveUsers',
  DailyDepositCount = 'dailyDepositCount',
  DailySwapCount = 'dailySwapCount',
  DailyTransactionCount = 'dailyTransactionCount',
  DailyWithdrawCount = 'dailyWithdrawCount',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
  TotalPoolCount = 'totalPoolCount',
}

export type UsageMetricsHourlySnapshot = {
  __typename?: 'UsageMetricsHourlySnapshot'
  /**  Block number of this snapshot  */
  blockNumber: Scalars['BigInt']
  /**  Number of cumulative unique users  */
  cumulativeUniqueUsers: Scalars['Int']
  /**  Number of unique hourly active users  */
  hourlyActiveUsers: Scalars['Int']
  /**  Total number of deposits (add liquidity) in an hour  */
  hourlyDepositCount: Scalars['Int']
  /**  Total number of trades (swaps) in an hour  */
  hourlySwapCount: Scalars['Int']
  /**  Total number of transactions occurred in an hour. Transactions include all entities that implement the Event interface.  */
  hourlyTransactionCount: Scalars['Int']
  /**  Total number of withdrawals (remove liquidity) in an hour  */
  hourlyWithdrawCount: Scalars['Int']
  /**  { # of hours since Unix epoch time }  */
  id: Scalars['ID']
  /**  Protocol this snapshot is associated with  */
  protocol: DexAmmProtocol
  /**  Timestamp of this snapshot  */
  timestamp: Scalars['BigInt']
}

export type UsageMetricsHourlySnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<UsageMetricsHourlySnapshot_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  cumulativeUniqueUsers?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_gte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_in?: InputMaybe<Array<Scalars['Int']>>
  cumulativeUniqueUsers_lt?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_lte?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not?: InputMaybe<Scalars['Int']>
  cumulativeUniqueUsers_not_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyActiveUsers?: InputMaybe<Scalars['Int']>
  hourlyActiveUsers_gt?: InputMaybe<Scalars['Int']>
  hourlyActiveUsers_gte?: InputMaybe<Scalars['Int']>
  hourlyActiveUsers_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyActiveUsers_lt?: InputMaybe<Scalars['Int']>
  hourlyActiveUsers_lte?: InputMaybe<Scalars['Int']>
  hourlyActiveUsers_not?: InputMaybe<Scalars['Int']>
  hourlyActiveUsers_not_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyDepositCount?: InputMaybe<Scalars['Int']>
  hourlyDepositCount_gt?: InputMaybe<Scalars['Int']>
  hourlyDepositCount_gte?: InputMaybe<Scalars['Int']>
  hourlyDepositCount_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyDepositCount_lt?: InputMaybe<Scalars['Int']>
  hourlyDepositCount_lte?: InputMaybe<Scalars['Int']>
  hourlyDepositCount_not?: InputMaybe<Scalars['Int']>
  hourlyDepositCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  hourlySwapCount?: InputMaybe<Scalars['Int']>
  hourlySwapCount_gt?: InputMaybe<Scalars['Int']>
  hourlySwapCount_gte?: InputMaybe<Scalars['Int']>
  hourlySwapCount_in?: InputMaybe<Array<Scalars['Int']>>
  hourlySwapCount_lt?: InputMaybe<Scalars['Int']>
  hourlySwapCount_lte?: InputMaybe<Scalars['Int']>
  hourlySwapCount_not?: InputMaybe<Scalars['Int']>
  hourlySwapCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyTransactionCount?: InputMaybe<Scalars['Int']>
  hourlyTransactionCount_gt?: InputMaybe<Scalars['Int']>
  hourlyTransactionCount_gte?: InputMaybe<Scalars['Int']>
  hourlyTransactionCount_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyTransactionCount_lt?: InputMaybe<Scalars['Int']>
  hourlyTransactionCount_lte?: InputMaybe<Scalars['Int']>
  hourlyTransactionCount_not?: InputMaybe<Scalars['Int']>
  hourlyTransactionCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyWithdrawCount?: InputMaybe<Scalars['Int']>
  hourlyWithdrawCount_gt?: InputMaybe<Scalars['Int']>
  hourlyWithdrawCount_gte?: InputMaybe<Scalars['Int']>
  hourlyWithdrawCount_in?: InputMaybe<Array<Scalars['Int']>>
  hourlyWithdrawCount_lt?: InputMaybe<Scalars['Int']>
  hourlyWithdrawCount_lte?: InputMaybe<Scalars['Int']>
  hourlyWithdrawCount_not?: InputMaybe<Scalars['Int']>
  hourlyWithdrawCount_not_in?: InputMaybe<Array<Scalars['Int']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<UsageMetricsHourlySnapshot_Filter>>>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum UsageMetricsHourlySnapshot_OrderBy {
  BlockNumber = 'blockNumber',
  CumulativeUniqueUsers = 'cumulativeUniqueUsers',
  HourlyActiveUsers = 'hourlyActiveUsers',
  HourlyDepositCount = 'hourlyDepositCount',
  HourlySwapCount = 'hourlySwapCount',
  HourlyTransactionCount = 'hourlyTransactionCount',
  HourlyWithdrawCount = 'hourlyWithdrawCount',
  Id = 'id',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
}

export type Withdraw = {
  __typename?: 'Withdraw'
  /**  USD-normalized value of the transaction of the underlying (e.g. sum of tokens withdrawn from a pool)  */
  amountUSD: Scalars['BigDecimal']
  /**  Block number of this event  */
  blockNumber: Scalars['BigInt']
  /**  Address that sent the tokens  */
  from: Scalars['String']
  /**  Transaction hash of the transaction that emitted this event  */
  hash: Scalars['String']
  /**  withdraw-{ Transaction hash }-{ Log index } */
  id: Scalars['ID']
  /**  Amount of input tokens in the token's native unit  */
  inputTokenAmounts: Array<Scalars['BigInt']>
  /**  Input tokens of the pool (not input tokens of the event/transaction). E.g. WETH and USDC from a WETH-USDC pool  */
  inputTokens: Array<Token>
  /**  Event log index. For transactions that don't emit event, create arbitrary index starting from 0  */
  logIndex: Scalars['Int']
  /**  Output token of the pool (not output token of the event/transaction). E.g. the UNI-LP token  */
  outputToken?: Maybe<Token>
  /**  Amount of output tokens in the token's native unit  */
  outputTokenAmount?: Maybe<Scalars['BigInt']>
  /**  The pool involving this transaction  */
  pool: LiquidityPool
  /**  The protocol this transaction belongs to  */
  protocol: DexAmmProtocol
  /**  Timestamp of this event  */
  timestamp: Scalars['BigInt']
  /**  Address that received the tokens  */
  to: Scalars['String']
}

export type WithdrawInputTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token_Filter>
}

export type Withdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amountUSD?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_gt?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_gte?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  amountUSD_lt?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_lte?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_not?: InputMaybe<Scalars['BigDecimal']>
  amountUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  and?: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>
  blockNumber?: InputMaybe<Scalars['BigInt']>
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>
  blockNumber_not?: InputMaybe<Scalars['BigInt']>
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['String']>
  from_contains?: InputMaybe<Scalars['String']>
  from_contains_nocase?: InputMaybe<Scalars['String']>
  from_ends_with?: InputMaybe<Scalars['String']>
  from_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_gt?: InputMaybe<Scalars['String']>
  from_gte?: InputMaybe<Scalars['String']>
  from_in?: InputMaybe<Array<Scalars['String']>>
  from_lt?: InputMaybe<Scalars['String']>
  from_lte?: InputMaybe<Scalars['String']>
  from_not?: InputMaybe<Scalars['String']>
  from_not_contains?: InputMaybe<Scalars['String']>
  from_not_contains_nocase?: InputMaybe<Scalars['String']>
  from_not_ends_with?: InputMaybe<Scalars['String']>
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  from_not_in?: InputMaybe<Array<Scalars['String']>>
  from_not_starts_with?: InputMaybe<Scalars['String']>
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  from_starts_with?: InputMaybe<Scalars['String']>
  from_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash?: InputMaybe<Scalars['String']>
  hash_contains?: InputMaybe<Scalars['String']>
  hash_contains_nocase?: InputMaybe<Scalars['String']>
  hash_ends_with?: InputMaybe<Scalars['String']>
  hash_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_gt?: InputMaybe<Scalars['String']>
  hash_gte?: InputMaybe<Scalars['String']>
  hash_in?: InputMaybe<Array<Scalars['String']>>
  hash_lt?: InputMaybe<Scalars['String']>
  hash_lte?: InputMaybe<Scalars['String']>
  hash_not?: InputMaybe<Scalars['String']>
  hash_not_contains?: InputMaybe<Scalars['String']>
  hash_not_contains_nocase?: InputMaybe<Scalars['String']>
  hash_not_ends_with?: InputMaybe<Scalars['String']>
  hash_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  hash_not_in?: InputMaybe<Array<Scalars['String']>>
  hash_not_starts_with?: InputMaybe<Scalars['String']>
  hash_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  hash_starts_with?: InputMaybe<Scalars['String']>
  hash_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  inputTokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokenAmounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  inputTokens?: InputMaybe<Array<Scalars['String']>>
  inputTokens_?: InputMaybe<Token_Filter>
  inputTokens_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  logIndex?: InputMaybe<Scalars['Int']>
  logIndex_gt?: InputMaybe<Scalars['Int']>
  logIndex_gte?: InputMaybe<Scalars['Int']>
  logIndex_in?: InputMaybe<Array<Scalars['Int']>>
  logIndex_lt?: InputMaybe<Scalars['Int']>
  logIndex_lte?: InputMaybe<Scalars['Int']>
  logIndex_not?: InputMaybe<Scalars['Int']>
  logIndex_not_in?: InputMaybe<Array<Scalars['Int']>>
  or?: InputMaybe<Array<InputMaybe<Withdraw_Filter>>>
  outputToken?: InputMaybe<Scalars['String']>
  outputTokenAmount?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_gt?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_gte?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputTokenAmount_lt?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_lte?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_not?: InputMaybe<Scalars['BigInt']>
  outputTokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  outputToken_?: InputMaybe<Token_Filter>
  outputToken_contains?: InputMaybe<Scalars['String']>
  outputToken_contains_nocase?: InputMaybe<Scalars['String']>
  outputToken_ends_with?: InputMaybe<Scalars['String']>
  outputToken_ends_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_gt?: InputMaybe<Scalars['String']>
  outputToken_gte?: InputMaybe<Scalars['String']>
  outputToken_in?: InputMaybe<Array<Scalars['String']>>
  outputToken_lt?: InputMaybe<Scalars['String']>
  outputToken_lte?: InputMaybe<Scalars['String']>
  outputToken_not?: InputMaybe<Scalars['String']>
  outputToken_not_contains?: InputMaybe<Scalars['String']>
  outputToken_not_contains_nocase?: InputMaybe<Scalars['String']>
  outputToken_not_ends_with?: InputMaybe<Scalars['String']>
  outputToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_not_in?: InputMaybe<Array<Scalars['String']>>
  outputToken_not_starts_with?: InputMaybe<Scalars['String']>
  outputToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  outputToken_starts_with?: InputMaybe<Scalars['String']>
  outputToken_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool?: InputMaybe<Scalars['String']>
  pool_?: InputMaybe<LiquidityPool_Filter>
  pool_contains?: InputMaybe<Scalars['String']>
  pool_contains_nocase?: InputMaybe<Scalars['String']>
  pool_ends_with?: InputMaybe<Scalars['String']>
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_gt?: InputMaybe<Scalars['String']>
  pool_gte?: InputMaybe<Scalars['String']>
  pool_in?: InputMaybe<Array<Scalars['String']>>
  pool_lt?: InputMaybe<Scalars['String']>
  pool_lte?: InputMaybe<Scalars['String']>
  pool_not?: InputMaybe<Scalars['String']>
  pool_not_contains?: InputMaybe<Scalars['String']>
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>
  pool_not_ends_with?: InputMaybe<Scalars['String']>
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  pool_not_in?: InputMaybe<Array<Scalars['String']>>
  pool_not_starts_with?: InputMaybe<Scalars['String']>
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  pool_starts_with?: InputMaybe<Scalars['String']>
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol?: InputMaybe<Scalars['String']>
  protocol_?: InputMaybe<DexAmmProtocol_Filter>
  protocol_contains?: InputMaybe<Scalars['String']>
  protocol_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_ends_with?: InputMaybe<Scalars['String']>
  protocol_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_gt?: InputMaybe<Scalars['String']>
  protocol_gte?: InputMaybe<Scalars['String']>
  protocol_in?: InputMaybe<Array<Scalars['String']>>
  protocol_lt?: InputMaybe<Scalars['String']>
  protocol_lte?: InputMaybe<Scalars['String']>
  protocol_not?: InputMaybe<Scalars['String']>
  protocol_not_contains?: InputMaybe<Scalars['String']>
  protocol_not_contains_nocase?: InputMaybe<Scalars['String']>
  protocol_not_ends_with?: InputMaybe<Scalars['String']>
  protocol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  protocol_not_in?: InputMaybe<Array<Scalars['String']>>
  protocol_not_starts_with?: InputMaybe<Scalars['String']>
  protocol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  protocol_starts_with?: InputMaybe<Scalars['String']>
  protocol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['String']>
  to_contains?: InputMaybe<Scalars['String']>
  to_contains_nocase?: InputMaybe<Scalars['String']>
  to_ends_with?: InputMaybe<Scalars['String']>
  to_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_gt?: InputMaybe<Scalars['String']>
  to_gte?: InputMaybe<Scalars['String']>
  to_in?: InputMaybe<Array<Scalars['String']>>
  to_lt?: InputMaybe<Scalars['String']>
  to_lte?: InputMaybe<Scalars['String']>
  to_not?: InputMaybe<Scalars['String']>
  to_not_contains?: InputMaybe<Scalars['String']>
  to_not_contains_nocase?: InputMaybe<Scalars['String']>
  to_not_ends_with?: InputMaybe<Scalars['String']>
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  to_not_in?: InputMaybe<Array<Scalars['String']>>
  to_not_starts_with?: InputMaybe<Scalars['String']>
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  to_starts_with?: InputMaybe<Scalars['String']>
  to_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Withdraw_OrderBy {
  AmountUsd = 'amountUSD',
  BlockNumber = 'blockNumber',
  From = 'from',
  Hash = 'hash',
  Id = 'id',
  InputTokenAmounts = 'inputTokenAmounts',
  InputTokens = 'inputTokens',
  LogIndex = 'logIndex',
  OutputToken = 'outputToken',
  OutputTokenAmount = 'outputTokenAmount',
  OutputTokenDecimals = 'outputToken__decimals',
  OutputTokenId = 'outputToken__id',
  OutputTokenLastPriceBlockNumber = 'outputToken__lastPriceBlockNumber',
  OutputTokenLastPriceUsd = 'outputToken__lastPriceUSD',
  OutputTokenName = 'outputToken__name',
  OutputTokenSymbol = 'outputToken__symbol',
  Pool = 'pool',
  PoolCreatedBlockNumber = 'pool__createdBlockNumber',
  PoolCreatedTimestamp = 'pool__createdTimestamp',
  PoolCumulativeProtocolSideRevenueUsd = 'pool__cumulativeProtocolSideRevenueUSD',
  PoolCumulativeSupplySideRevenueUsd = 'pool__cumulativeSupplySideRevenueUSD',
  PoolCumulativeTotalRevenueUsd = 'pool__cumulativeTotalRevenueUSD',
  PoolCumulativeVolumeUsd = 'pool__cumulativeVolumeUSD',
  PoolId = 'pool__id',
  PoolIsSingleSided = 'pool__isSingleSided',
  PoolName = 'pool__name',
  PoolOutputTokenPriceUsd = 'pool__outputTokenPriceUSD',
  PoolOutputTokenSupply = 'pool__outputTokenSupply',
  PoolStakedOutputTokenAmount = 'pool__stakedOutputTokenAmount',
  PoolSymbol = 'pool__symbol',
  PoolTotalValueLockedUsd = 'pool__totalValueLockedUSD',
  Protocol = 'protocol',
  ProtocolRegenesis = 'protocol___regenesis',
  ProtocolCumulativeProtocolSideRevenueUsd = 'protocol__cumulativeProtocolSideRevenueUSD',
  ProtocolCumulativeSupplySideRevenueUsd = 'protocol__cumulativeSupplySideRevenueUSD',
  ProtocolCumulativeTotalRevenueUsd = 'protocol__cumulativeTotalRevenueUSD',
  ProtocolCumulativeUniqueUsers = 'protocol__cumulativeUniqueUsers',
  ProtocolCumulativeVolumeUsd = 'protocol__cumulativeVolumeUSD',
  ProtocolId = 'protocol__id',
  ProtocolMethodologyVersion = 'protocol__methodologyVersion',
  ProtocolName = 'protocol__name',
  ProtocolNetwork = 'protocol__network',
  ProtocolProtocolControlledValueUsd = 'protocol__protocolControlledValueUSD',
  ProtocolSchemaVersion = 'protocol__schemaVersion',
  ProtocolSlug = 'protocol__slug',
  ProtocolSubgraphVersion = 'protocol__subgraphVersion',
  ProtocolTotalPoolCount = 'protocol__totalPoolCount',
  ProtocolTotalValueLockedUsd = 'protocol__totalValueLockedUSD',
  ProtocolType = 'protocol__type',
  Timestamp = 'timestamp',
  To = 'to',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/**   Used to keep track of the price of Ether/TVL in USD, pool deposit count, and total unique users  */
export type _HelperStore = {
  __typename?: '_HelperStore'
  id: Scalars['ID']
  /**  price of ETH/TVL in USD  */
  valueDecimal?: Maybe<Scalars['BigDecimal']>
  /**  # of deposits, # of unique users  */
  valueInt?: Maybe<Scalars['Int']>
}

export type _HelperStore_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<_HelperStore_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<_HelperStore_Filter>>>
  valueDecimal?: InputMaybe<Scalars['BigDecimal']>
  valueDecimal_gt?: InputMaybe<Scalars['BigDecimal']>
  valueDecimal_gte?: InputMaybe<Scalars['BigDecimal']>
  valueDecimal_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  valueDecimal_lt?: InputMaybe<Scalars['BigDecimal']>
  valueDecimal_lte?: InputMaybe<Scalars['BigDecimal']>
  valueDecimal_not?: InputMaybe<Scalars['BigDecimal']>
  valueDecimal_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>
  valueInt?: InputMaybe<Scalars['Int']>
  valueInt_gt?: InputMaybe<Scalars['Int']>
  valueInt_gte?: InputMaybe<Scalars['Int']>
  valueInt_in?: InputMaybe<Array<Scalars['Int']>>
  valueInt_lt?: InputMaybe<Scalars['Int']>
  valueInt_lte?: InputMaybe<Scalars['Int']>
  valueInt_not?: InputMaybe<Scalars['Int']>
  valueInt_not_in?: InputMaybe<Array<Scalars['Int']>>
}

export enum _HelperStore_OrderBy {
  Id = 'id',
  ValueDecimal = 'valueDecimal',
  ValueInt = 'valueInt',
}

export type _LiquidityPoolAmount = {
  __typename?: '_LiquidityPoolAmount'
  /**  Smart contract address of the pool  */
  id: Scalars['ID']
  /**  Amount of input tokens in the pool. The ordering should be the same as the pool's `inputTokens` field.  */
  inputTokenBalances: Array<Scalars['BigDecimal']>
  /**  Input tokens of the pool (not input tokens of the event/transaction). E.g. WETH and USDC from a WETH-USDC pool  */
  inputTokens: Array<Token>
  tokenPrices: Array<Scalars['BigDecimal']>
}

export type _LiquidityPoolAmountInputTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token_Filter>
}

export type _LiquidityPoolAmount_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<_LiquidityPoolAmount_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  inputTokenBalances?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenBalances_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenBalances_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenBalances_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenBalances_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  inputTokenBalances_not_contains_nocase?: InputMaybe<
    Array<Scalars['BigDecimal']>
  >
  inputTokens?: InputMaybe<Array<Scalars['String']>>
  inputTokens_?: InputMaybe<Token_Filter>
  inputTokens_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains?: InputMaybe<Array<Scalars['String']>>
  inputTokens_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  or?: InputMaybe<Array<InputMaybe<_LiquidityPoolAmount_Filter>>>
  tokenPrices?: InputMaybe<Array<Scalars['BigDecimal']>>
  tokenPrices_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  tokenPrices_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>
  tokenPrices_not?: InputMaybe<Array<Scalars['BigDecimal']>>
  tokenPrices_not_contains?: InputMaybe<Array<Scalars['BigDecimal']>>
  tokenPrices_not_contains_nocase?: InputMaybe<Array<Scalars['BigDecimal']>>
}

export enum _LiquidityPoolAmount_OrderBy {
  Id = 'id',
  InputTokenBalances = 'inputTokenBalances',
  InputTokens = 'inputTokens',
  TokenPrices = 'tokenPrices',
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

/**  This is used to keep tract of the derived price of tokens in ethereum and the whitelisted pools to which it belongs */
export type _TokenWhitelist = {
  __typename?: '_TokenWhitelist'
  /**  Token Address  */
  id: Scalars['ID']
  /**  pools token is in that are white listed for USD pricing  */
  whitelistPools: Array<LiquidityPool>
}

/**  This is used to keep tract of the derived price of tokens in ethereum and the whitelisted pools to which it belongs */
export type _TokenWhitelistWhitelistPoolsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<LiquidityPool_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<LiquidityPool_Filter>
}

export type _TokenWhitelist_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<_TokenWhitelist_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<_TokenWhitelist_Filter>>>
  whitelistPools?: InputMaybe<Array<Scalars['String']>>
  whitelistPools_?: InputMaybe<LiquidityPool_Filter>
  whitelistPools_contains?: InputMaybe<Array<Scalars['String']>>
  whitelistPools_contains_nocase?: InputMaybe<Array<Scalars['String']>>
  whitelistPools_not?: InputMaybe<Array<Scalars['String']>>
  whitelistPools_not_contains?: InputMaybe<Array<Scalars['String']>>
  whitelistPools_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>
}

export enum _TokenWhitelist_OrderBy {
  Id = 'id',
  WhitelistPools = 'whitelistPools',
}

export type SwapsQueryVariables = Exact<{
  to?: InputMaybe<Scalars['String']>
}>

export type SwapsQuery = {
  __typename?: 'Query'
  swaps: Array<{
    __typename?: 'Swap'
    id: string
    from: string
    hash: string
    to: string
    timestamp: any
    amountIn: any
    amountOut: any
    logIndex: number
    blockNumber: any
    tokenIn: {
      __typename?: 'Token'
      name: string
      decimals: number
      symbol: string
    }
    tokenOut: {
      __typename?: 'Token'
      name: string
      decimals: number
      symbol: string
    }
  }>
}

export const SwapsDocument = `
    query swaps($to: String) {
  swaps(where: {to: $to}) {
    id
    from
    hash
    to
    timestamp
    amountIn
    amountOut
    logIndex
    blockNumber
    tokenIn {
      name
      decimals
      symbol
    }
    tokenOut {
      name
      decimals
      symbol
    }
  }
}
    `
export const useSwapsQuery = <TData = SwapsQuery, TError = unknown>(
  variables?: SwapsQueryVariables,
  options?: UseQueryOptions<SwapsQuery, TError, TData>
) =>
  useQuery<SwapsQuery, TError, TData>(
    variables === undefined ? ['swaps'] : ['swaps', variables],
    fetcher<SwapsQuery, SwapsQueryVariables>(SwapsDocument, variables),
    options
  )

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Event: [],
    Protocol: ['DexAmmProtocol'],
  },
}
export default result
