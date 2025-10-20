"use client";

import {
  Ticker,
  TickerIcon,
  TickerPrice,
  TickerPriceChange,
  TickerSymbol,
} from "@repo/ticker";
import Image from "next/image";

const logoToken = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

const items = [
  {
    symbol: "DUOL",
    logoSymbol: "DUOL",
    price: 478.03,
    change: 5.2,
  },
  {
    symbol: "DBD",
    logoSymbol: "DBD",
    price: 102.33,
    change: 1.05,
    currency: "EUR",
    locale: "de-DE",
  },
  {
    symbol: "7203.T",
    logoSymbol: "TM",
    price: 2460,
    change: -120,
    currency: "JPY",
    locale: "ja-JP",
  },
];

const Example = () =>
  items.map((i) => (
    <Ticker currency={i.currency} key={i.symbol} locale={i.locale}>
      {logoToken ? (
        <TickerIcon asChild>
          <Image
            alt={i.symbol}
            height={26}
            src={`https://img.logo.dev/ticker/${i.logoSymbol}?token=${logoToken}&size=26&retina=true`}
            width={26}
          />
        </TickerIcon>
      ) : (
        <TickerIcon symbol={i.symbol} />
      )}
      <TickerSymbol symbol={i.symbol} />
      <TickerPrice price={i.price} />
      <TickerPriceChange change={i.change} />
    </Ticker>
  ));

export default Example;
