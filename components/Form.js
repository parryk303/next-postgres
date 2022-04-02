import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_BUTTON = css`
  background: ${Constants.theme.buttonBackground};
  transition: 200ms ease background;
  font-weight: 700;
  border: none;
  margin: 0;
  padding: 0 24px 0 24px;
  height: 48px;
  border-radius: 48px;
  width: auto;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  font: inherit;
  line-height: normal;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  text-decoration: none;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  ::-moz-focus-inner {
    border: 0;
    outline: 0;
    padding: 0;
  }

  :hover {
    background: ${Constants.theme.buttonBackgroundHover};
  }

  :focus {
    border: 0;
    outline: 0;
  }

  :active {
    background: ${Constants.theme.buttonBackgroundActive};
    border: 0;
    outline: 0;
  }

  min-width: 280px;
  font-size: 18px;
`;

export const Button = ({ children, style, onClick, href }) => {
  if (href) {
    return (
      <a css={STYLES_BUTTON} style={style} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button css={STYLES_BUTTON} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

const STYLES_INPUT = css`
  border: none;
  outline: 0;
  margin: 0;
  padding: 0 24px 0 24px;
  background: ${Constants.colors.gray3};

  :focus {
    border: 0;
    outline: 0;
  }

  :active {
    border: 0;
    outline: 0;
  }

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  ::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  height: 48px;
  width: 100%;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 18px;
`;

export const Input = ({
  children,
  style,
  value,
  name,
  placeholder,
  type = "text",
  autoComplete = "input-autocomplete-off",
  onBlur = (e) => {},
  onFocus = (e) => {},
  onChange = (e) => {},
}) => {
  return (
    <input
      css={STYLES_INPUT}
      style={style}
      value={value}
      onChange={onChange}
      name={name}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
      placeholder={placeholder}
    >
      {children}
    </input>
  );
};
