import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { TextField } from "../components/text-field";
import { ComponentProps } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
type StoryProps = ComponentProps<typeof TextField>;

const meta: Meta<StoryProps> = {
  title: "Example/TextField",
  component: TextField,
};

export default meta;
type Story = StoryObj<StoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultTextField: Story = {
  args: {
    label: "Label",
  },
};

export const DisabledTextField: Story = {
  args: {
    label: "Label",
    disabled: true
  },
};

export const ErrorTextField: Story = {
  args: {
    label: "Label",
    error: true
  },
};

export const ErrorTextFieldWithHelper: Story = {
  args: {
    label: "Label",
    error: true,
    helperText: "Some text"
  },
};