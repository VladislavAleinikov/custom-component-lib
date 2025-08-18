import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Button } from "../components/button";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
  title: "Example/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const SmallText: Story = {
  args: {
    variant: "text",
    size: "small",
    children: "SMALL",
  },
};

export const MediumText: Story = {
  args: {
    variant: "text",
    size: "medium",
    children: "MEDIUM",
  },
};

export const LargeText: Story = {
  args: {
    variant: "text",
    size: "large",
    children: "LARGE",
  },
};

export const SmallContained: Story = {
  args: {
    variant: "contained",
    size: "small",
    children: "SMALL",
  },
};

export const MediumContained: Story = {
  args: {
    variant: "contained",
    size: "medium",
    children: "MEDIUM",
  },
};

export const LargeContained: Story = {
  args: {
    variant: "contained",
    size: "large",
    children: "LARGE",
  },
};

export const SmallOutlined: Story = {
  args: {
    variant: "outlined",
    size: "small",
    children: "SMALL",
  },
};

export const MediumOutlined: Story = {
  args: {
    variant: "outlined",
    size: "medium",
    children: "MEDIUM",
  },
};

export const LargeOutlined: Story = {
  args: {
    variant: "outlined",
    size: "large",
    children: "LARGE",
  },
};
