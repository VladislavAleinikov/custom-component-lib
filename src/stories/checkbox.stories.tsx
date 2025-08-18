import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Checkbox } from "../components/checkbox";
import { ComponentProps } from "react";

type StoryProps = ComponentProps<typeof Checkbox>;

const meta: Meta<StoryProps> = {
  title: "Example/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<StoryProps>;

export const BasicCheckbox: Story = {
  args: {
    defaultChecked: true,
    disabled: false,
  },
};

export const CheckboxWithLabel: Story = {
  args: {
    label: "Some text",
  },
};
