import { GrazProvider } from "graz"
import { useState, type PropsWithChildren } from "react"
import { Bech32Address } from "@keplr-wallet/cosmos"

const osmoCurrency = {
  coinDenom: "OSMO",
  coinMinimalDenom: "uosmo",
  coinDecimals: 6,
}

const osmosisChainInfo = {
  chainId: "osmosis-1",
  chainName: "Osmosis",
  rpc: "https://rpc.osmosis.zone/",
  rest: "https://lcd.osmosis.zone/",
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("osmo"),
  currencies: [osmoCurrency],
  feeCurrencies: [
    {
      ...osmoCurrency,
      gasPriceStep: {
        low: Number.parseInt("0.025"),
        average: Number.parseInt("0.03"),
        high: Number.parseInt("0.035"),
      },
    },
  ],
  stakeCurrency: osmoCurrency,
}

export const Graz = (props: PropsWithChildren) => {
  const [, setCount] = useState(0)

  const handleClick = () => {
    setCount((count) => {
      return (count += 1)
    })
  }

  return (
    <>
      <button onClick={handleClick} type="button">rerender</button>
      <GrazProvider grazOptions={{ chains: [osmosisChainInfo] }}>
        {props.children}
      </GrazProvider>
    </>
  )
}
