/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface ACDMPlatformInterface extends utils.Interface {
  functions: {
    "DAO()": FunctionFragment;
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "REGISTERED()": FunctionFragment;
    "addOrder(uint256,uint256)": FunctionFragment;
    "burnForAll()": FunctionFragment;
    "buy()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "orderCount()": FunctionFragment;
    "redeemOrder(uint256,uint256)": FunctionFragment;
    "register()": FunctionFragment;
    "registerWithReferer(address)": FunctionFragment;
    "removeOrder(uint256)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "sendAll(address)": FunctionFragment;
    "sendCommissionOnly(address)": FunctionFragment;
    "setFirstRefererCommission(uint256)": FunctionFragment;
    "setSecondRefererCommission(uint256)": FunctionFragment;
    "setTradeCommission(uint256)": FunctionFragment;
    "startSaleRound()": FunctionFragment;
    "startTradeRound()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "tradeVolumeEth()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DAO"
      | "DEFAULT_ADMIN_ROLE"
      | "REGISTERED"
      | "addOrder"
      | "burnForAll"
      | "buy"
      | "getRoleAdmin"
      | "grantRole"
      | "hasRole"
      | "orderCount"
      | "redeemOrder"
      | "register"
      | "registerWithReferer"
      | "removeOrder"
      | "renounceRole"
      | "revokeRole"
      | "sendAll"
      | "sendCommissionOnly"
      | "setFirstRefererCommission"
      | "setSecondRefererCommission"
      | "setTradeCommission"
      | "startSaleRound"
      | "startTradeRound"
      | "supportsInterface"
      | "tradeVolumeEth"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "DAO", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REGISTERED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addOrder",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnForAll",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "buy", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "orderCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "redeemOrder",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "register", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerWithReferer",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "removeOrder",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(functionFragment: "sendAll", values: [string]): string;
  encodeFunctionData(
    functionFragment: "sendCommissionOnly",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setFirstRefererCommission",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setSecondRefererCommission",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTradeCommission",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "startSaleRound",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startTradeRound",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tradeVolumeEth",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "DAO", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "REGISTERED", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "addOrder", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burnForAll", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "orderCount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "redeemOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerWithReferer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sendAll", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendCommissionOnly",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFirstRefererCommission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSecondRefererCommission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTradeCommission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startSaleRound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startTradeRound",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tradeVolumeEth",
    data: BytesLike
  ): Result;

  events: {
    "OrderCreated(uint256,address,uint256,uint256)": EventFragment;
    "OrderRedeemed(uint256,address,uint256)": EventFragment;
    "OrderRemoved(uint256,uint256)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "SaleRoundStarted(uint256)": EventFragment;
    "SoldOut(uint256)": EventFragment;
    "TradeRoundStarted(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OrderCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderRedeemed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OrderRemoved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SaleRoundStarted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SoldOut"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TradeRoundStarted"): EventFragment;
}

export interface OrderCreatedEventObject {
  orderId: BigNumber;
  seller: string;
  price: BigNumber;
  availableAmount: BigNumber;
}
export type OrderCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber, BigNumber],
  OrderCreatedEventObject
>;

export type OrderCreatedEventFilter = TypedEventFilter<OrderCreatedEvent>;

export interface OrderRedeemedEventObject {
  orderId: BigNumber;
  buyer: string;
  deductedAmount: BigNumber;
}
export type OrderRedeemedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  OrderRedeemedEventObject
>;

export type OrderRedeemedEventFilter = TypedEventFilter<OrderRedeemedEvent>;

export interface OrderRemovedEventObject {
  orderId: BigNumber;
  leftAmount: BigNumber;
}
export type OrderRemovedEvent = TypedEvent<
  [BigNumber, BigNumber],
  OrderRemovedEventObject
>;

export type OrderRemovedEventFilter = TypedEventFilter<OrderRemovedEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface SaleRoundStartedEventObject {
  finishTime: BigNumber;
}
export type SaleRoundStartedEvent = TypedEvent<
  [BigNumber],
  SaleRoundStartedEventObject
>;

export type SaleRoundStartedEventFilter =
  TypedEventFilter<SaleRoundStartedEvent>;

export interface SoldOutEventObject {
  currentTime: BigNumber;
}
export type SoldOutEvent = TypedEvent<[BigNumber], SoldOutEventObject>;

export type SoldOutEventFilter = TypedEventFilter<SoldOutEvent>;

export interface TradeRoundStartedEventObject {
  finishTime: BigNumber;
}
export type TradeRoundStartedEvent = TypedEvent<
  [BigNumber],
  TradeRoundStartedEventObject
>;

export type TradeRoundStartedEventFilter =
  TypedEventFilter<TradeRoundStartedEvent>;

export interface ACDMPlatform extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ACDMPlatformInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    DAO(overrides?: CallOverrides): Promise<[string]>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    REGISTERED(overrides?: CallOverrides): Promise<[string]>;

    addOrder(
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burnForAll(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    buy(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    orderCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    redeemOrder(
      orderID: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    register(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    registerWithReferer(
      referer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeOrder(
      orderID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendAll(
      reciever: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendCommissionOnly(
      reciever: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setFirstRefererCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSecondRefererCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setTradeCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startSaleRound(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startTradeRound(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    tradeVolumeEth(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  DAO(overrides?: CallOverrides): Promise<string>;

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  REGISTERED(overrides?: CallOverrides): Promise<string>;

  addOrder(
    price: BigNumberish,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burnForAll(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  buy(
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  orderCount(overrides?: CallOverrides): Promise<BigNumber>;

  redeemOrder(
    orderID: BigNumberish,
    amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  register(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  registerWithReferer(
    referer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeOrder(
    orderID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendAll(
    reciever: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendCommissionOnly(
    reciever: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setFirstRefererCommission(
    commission: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSecondRefererCommission(
    commission: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setTradeCommission(
    commission: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startSaleRound(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startTradeRound(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  tradeVolumeEth(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    DAO(overrides?: CallOverrides): Promise<string>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    REGISTERED(overrides?: CallOverrides): Promise<string>;

    addOrder(
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burnForAll(overrides?: CallOverrides): Promise<boolean>;

    buy(overrides?: CallOverrides): Promise<boolean>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    orderCount(overrides?: CallOverrides): Promise<BigNumber>;

    redeemOrder(
      orderID: BigNumberish,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    register(overrides?: CallOverrides): Promise<boolean>;

    registerWithReferer(
      referer: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    removeOrder(
      orderID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    sendAll(reciever: string, overrides?: CallOverrides): Promise<boolean>;

    sendCommissionOnly(
      reciever: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setFirstRefererCommission(
      commission: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setSecondRefererCommission(
      commission: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setTradeCommission(
      commission: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    startSaleRound(overrides?: CallOverrides): Promise<boolean>;

    startTradeRound(overrides?: CallOverrides): Promise<boolean>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    tradeVolumeEth(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "OrderCreated(uint256,address,uint256,uint256)"(
      orderId?: BigNumberish | null,
      seller?: string | null,
      price?: BigNumberish | null,
      availableAmount?: null
    ): OrderCreatedEventFilter;
    OrderCreated(
      orderId?: BigNumberish | null,
      seller?: string | null,
      price?: BigNumberish | null,
      availableAmount?: null
    ): OrderCreatedEventFilter;

    "OrderRedeemed(uint256,address,uint256)"(
      orderId?: BigNumberish | null,
      buyer?: string | null,
      deductedAmount?: null
    ): OrderRedeemedEventFilter;
    OrderRedeemed(
      orderId?: BigNumberish | null,
      buyer?: string | null,
      deductedAmount?: null
    ): OrderRedeemedEventFilter;

    "OrderRemoved(uint256,uint256)"(
      orderId?: BigNumberish | null,
      leftAmount?: null
    ): OrderRemovedEventFilter;
    OrderRemoved(
      orderId?: BigNumberish | null,
      leftAmount?: null
    ): OrderRemovedEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "SaleRoundStarted(uint256)"(finishTime?: null): SaleRoundStartedEventFilter;
    SaleRoundStarted(finishTime?: null): SaleRoundStartedEventFilter;

    "SoldOut(uint256)"(currentTime?: null): SoldOutEventFilter;
    SoldOut(currentTime?: null): SoldOutEventFilter;

    "TradeRoundStarted(uint256)"(
      finishTime?: null
    ): TradeRoundStartedEventFilter;
    TradeRoundStarted(finishTime?: null): TradeRoundStartedEventFilter;
  };

  estimateGas: {
    DAO(overrides?: CallOverrides): Promise<BigNumber>;

    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    REGISTERED(overrides?: CallOverrides): Promise<BigNumber>;

    addOrder(
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burnForAll(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    buy(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    orderCount(overrides?: CallOverrides): Promise<BigNumber>;

    redeemOrder(
      orderID: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    register(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    registerWithReferer(
      referer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeOrder(
      orderID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendAll(
      reciever: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendCommissionOnly(
      reciever: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setFirstRefererCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSecondRefererCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setTradeCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startSaleRound(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startTradeRound(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    tradeVolumeEth(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    DAO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    REGISTERED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addOrder(
      price: BigNumberish,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burnForAll(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    buy(
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    orderCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    redeemOrder(
      orderID: BigNumberish,
      amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    register(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    registerWithReferer(
      referer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeOrder(
      orderID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendAll(
      reciever: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendCommissionOnly(
      reciever: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setFirstRefererCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSecondRefererCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setTradeCommission(
      commission: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startSaleRound(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startTradeRound(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    tradeVolumeEth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}