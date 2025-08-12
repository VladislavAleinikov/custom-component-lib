import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Modal } from "../components/modal";
import { ComponentProps, useState } from "react";
import { Button } from "../components//button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
type StoryProps = ComponentProps<typeof Modal>;

const meta: Meta<StoryProps> = {
  title: "Example/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<StoryProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicModal: Story = {
  args: {
    open: false,
    onClose: () => {},
  },
  render: (args) => {
    return (
      <Modal {...args}>
        <h2>Title</h2>
        <p>Text</p>
      </Modal>
    );
  },
};

export const ModalWithButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button size="large" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <h2>Title</h2>
          <p>Text</p>
        </Modal>
      </>
    );
  },
};
