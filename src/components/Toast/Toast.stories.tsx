import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    open: true,
    type: "success",
    message: "Payment completed successfully.",
    duration: 2500,
    closable: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <button onClick={() => setOpen(true)}>Show toast</button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const ErrorLongerDuration: Story = {
  args: {
    open: true,
    type: "error",
    message: "Something went wrong. Please try again.",
    duration: 5000,
    closable: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <button onClick={() => setOpen(true)}>Show toast</button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const NotClosable: Story = {
  args: {
    open: true,
    type: "info",
    message: "Auto-close only (no close button).",
    duration: 2500,
    closable: false,
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <button onClick={() => setOpen(true)}>Show toast</button>
        <Toast {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};
