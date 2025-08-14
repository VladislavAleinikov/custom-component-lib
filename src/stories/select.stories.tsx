import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Select } from "../components/select";
import { ComponentProps, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
type StoryProps = ComponentProps<typeof Select>;

const meta: Meta<StoryProps> = {
  title: "Example/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<StoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicSelect: Story = {
  args: {
    options: [
      {
        label: "Option 1",
        value: "opt1",
      },
      {
        label: "Option 2",
        value: "opt2",
      },
      {
        label: "Option 3",
        value: "opt3",
      },
    ],
    label: "Please select...",
    onChange: () => {},
  },
};

export const ControledSelect: Story = {
  args: {},
  render: (...args) => {
    const [open, setOpen] = useState(false);

    return (
      <Select
        options={[
          {
            label: "Option 1",
            value: "opt1",
          },
          {
            label: "Option 2",
            value: "opt2",
          },
          {
            label: "Option 3",
            value: "opt3",
          },
        ]}
        label="Please select..."
        onChange={() => {}}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  },
};
