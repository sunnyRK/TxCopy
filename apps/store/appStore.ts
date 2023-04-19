import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  tokenIn: any;
  tokenOut: any;

  decimalIn: any;
  decimalOut: any;

  balanceIn: any;
  balanceOut: any;

  allowanceIn: any;
  allowanceOut: any;

  permit2Allowance: any;

  setTokenIn: (tokenIn: any) => void;
  setTokenOut: (tokenOut: any) => void;
  setDecimalIn: (decimalIn: any) => void;
  setDecimalOut: (decimalOut: any) => void;
  setBalanceIn: (balanceIn: any) => void;
  setBalanceOut: (balanceOut: any) => void;
  setAllowanceIn: (allowanceIn: any) => void;
  setAllowanceOut: (allowanceOut: any) => void;
  setPermit2Allowance: (permit2Allowance: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  tokenIn: "",
  tokenOut: "",
  decimalIn: "",
  decimalOut: "",
  balanceIn: "",
  balanceOut: "",
  allowanceIn: "",
  allowanceOut: "",
  permit2Allowance: "",
  setTokenIn: (tokenIn) => set(() => ({ tokenIn })),
  setTokenOut: (tokenOut) => set(() => ({ tokenOut })),
  setDecimalIn: (decimalIn) => set(() => ({ decimalIn })),
  setDecimalOut: (decimalOut) => set(() => ({ decimalOut })),
  setBalanceIn: (balanceIn) => set(() => ({ balanceIn })),
  setBalanceOut: (balanceOut) => set(() => ({ balanceOut })),
  setAllowanceIn: (allowanceIn) => set(() => ({ allowanceIn })),
  setAllowanceOut: (allowanceOut) => set(() => ({ allowanceOut })),
  setPermit2Allowance: (permit2Allowance) => set(() => ({ permit2Allowance })),
}));

