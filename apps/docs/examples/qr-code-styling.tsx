"use client";

import { QRCode } from "@repo/qr-code";

const Example = () => (
  <QRCode
    className="size-48 rounded border bg-white p-4 shadow-xs"
    data="https://www.loveconnor.com/"
  />
);

export default Example;
