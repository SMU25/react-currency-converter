import React, { FC } from "react";
import cn from "classnames";
import { CURRENCIES } from "src/constants/currencies";

interface Props {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const Currencies: FC<Props> = ({ currency, setCurrency }) => (
  <>
    {Object.values(CURRENCIES).map((cur: string) => (
      <li
        key={cur}
        className={cn({ active: currency === cur })}
        onClick={() => setCurrency(cur)}
      >
        {cur}
      </li>
    ))}
  </>
);
