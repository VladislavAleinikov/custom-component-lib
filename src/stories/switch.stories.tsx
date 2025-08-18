import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Switch } from "../components/switch";
import { ComponentProps, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
type StoryProps = ComponentProps<typeof Switch>;

const meta: Meta<StoryProps> = {
  title: "Example/Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<StoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicSwitch: Story = {
  args: {
    checked: false,
    disabled: false,
    onChange: () => alert("asdasf")
  },
};
