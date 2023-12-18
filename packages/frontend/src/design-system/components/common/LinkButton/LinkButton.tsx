import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

import Button from "../Button";
import { ButtonProps } from "../Button/Button";

export interface LinkButtonProps extends Omit<ButtonProps, "onClick"> {
  path: string;
}

export function LinkButton({ path, children, ...rest }: LinkButtonProps) {
  const router = useRouter();

  const handleRoute: MouseEventHandler<HTMLButtonElement> = () => {
    router.push(path);
  };

  return (
    <Button {...rest} onClick={handleRoute}>
      {children}
    </Button>
  );
}
