"use client";

import {
  Ticker,
  TickerIcon,
  TickerPrice,
  TickerPriceChange,
  TickerSymbol,
} from "@repo/ticker";
import Image from "next/image";

const ticker = "GOOG";
const logoToken = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN;

const Example = () => (
  <Ticker>
    {logoToken ? (
      <TickerIcon asChild>
        <Image
          alt={ticker}
          height={26}
          src={`https://img.logo.dev/ticker/${ticker}?token=${logoToken}&size=26&retina=true`}
          width={26}
        />
      </TickerIcon>
    ) : (
      <TickerIcon symbol={ticker} />
    )}
    <TickerSymbol symbol={ticker} />
    <TickerPrice price={175.41} />
    <TickerPriceChange change={2.13} />
  </Ticker>
);

export default Example;
