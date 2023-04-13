import { infura_key2 } from '@/pages/common/keys'
import { SupportedChainId, Token } from '@uniswap/sdk-core'
// import { DAI_POLYGON } from '@uniswap/smart-order-router'
// import { ONE_INCH, AAVE, DAI_TOKEN } from './libs/constants'

export const DAI = new Token(
  SupportedChainId.POLYGON,
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  18,
  'DAI',
  '(PoS) Dai Stablecoin'
)

export const AAVE = new Token(
  SupportedChainId.POLYGON,
  '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
  18,
  'AAVE',
  'Aave Token'
)

// Sets if the example should run locally or on chain
// export enum Environment {
//   LOCAL,
//   WALLET_EXTENSION,
//   MAINNET,
// }

// Inputs that configure this example to run
// export interface ExampleConfig {
//   env: Environment
//   rpc: {
//     local: string
//     mainnet: string
//   }
//   wallet: {
//     address: string
//     privateKey: string
//   }
//   tokens: {
//     in: Token
//     amountIn: number
//     out: Token
//   }
// }

// Example Configuration

// export const CurrentConfig: ExampleConfig = {
//   env: Environment.WALLET_EXTENSION,
//   rpc: {
//     local: 'http://localhost:8545',
// mainnet: `https://mainnet.infura.io/v3/${infura_key2}`,
//   },
//   wallet: {
//     address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
//     privateKey:
//       '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
//   },
//   tokens: {
//     in: DAI,
//     amountIn: 1,
//     out: AAVE,
//   },
// }
