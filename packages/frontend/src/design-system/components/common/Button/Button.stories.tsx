import { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  args: {
    variant: "primaryFill",
    children: "variants",
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primaryFill",
    children: "full width",
    full: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primaryFill",
    children: "disabled",
    disabled: true,
  },
};
