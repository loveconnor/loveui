"use client";

import {
  Cursor,
  CursorBody,
  CursorMessage,
  CursorName,
  CursorPointer,
} from "@repo/cursor";

const Example = () => (
  <>
    <Cursor className="absolute top-24 left-24">
      <CursorPointer className="text-emerald-500" />
      <CursorBody className="bg-emerald-50 text-emerald-700">
        <CursorName>@loveconnor</CursorName>
        <CursorMessage>Can we change the color?</CursorMessage>
      </CursorBody>
    </Cursor>
    <Cursor className="absolute top-48 right-32">
      <CursorPointer className="text-rose-500" />
      <CursorBody className="bg-rose-50 text-rose-700">
        <CursorName>@monster0506</CursorName>
        <CursorMessage>I'm not sure if this is working...</CursorMessage>
      </CursorBody>
    </Cursor>
    <Cursor className="absolute bottom-24 left-48">
      <CursorPointer className="text-sky-500" />
      <CursorBody className="bg-sky-50 text-sky-700">
        <CursorName>@clove</CursorName>
        <CursorMessage>What is this?</CursorMessage>
      </CursorBody>
    </Cursor>
  </>
);

export default Example;
