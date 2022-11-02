import React, { FC, ReactNode, ChangeEvent } from "react";

interface Props {
  children: ReactNode;
  value: number;
  onChangeValue: (value: number) => void;
}

export const Block: FC<Props> = ({ children, value, onChangeValue }) => (
  <div className="block">
    <ul className="currencies">{children}</ul>
    <input
      onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
        onChangeValue(Number(target.value))
      }
      value={value === 0 ? "" : Number(value.toFixed(4))}
      type="number"
      placeholder="0"
    />
  </div>
);
