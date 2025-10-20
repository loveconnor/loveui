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
    symbol: "TSLA",
    price: 182.12,
    change: -3.12,
  },
  {
    symbol: "MSFT",
    price: 409.33,
    change: 2.18,
  },
];

const Example = () => (
  <>
    {items.map((i) => (
      <Ticker key={i.symbol}>
        {logoToken ? (
          <TickerIcon asChild>
            <Image
              alt={i.symbol}
              height={26}
              src={`https://img.logo.dev/ticker/${i.symbol}?token=${logoToken}&size=26&retina=true`}
              width={26}
            />
          </TickerIcon>
        ) : (
          <TickerIcon symbol={i.symbol} />
        )}
        <TickerSymbol symbol={i.symbol} />
        <TickerPrice price={i.price} />
        <TickerPriceChange change={i.change} isPercent />
      </Ticker>
    ))}
  </>
);

export default Example;
