import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Input/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onChange: { action: "changed" },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    label: "Email",
    placeholder: "Type something…",
    clearable: true,
    hint: "We’ll never share it.",
  },
  render: (args) => {
    const [val, setVal] = useState("hello@example.com");
    return (
      <div style={{ width: 420 }}>
        <Input {...args} value={val} onChange={setVal} />
      </div>
    );
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState("secret123");
    return (
      <div style={{ width: 420 }}>
        <Input {...args} value={val} onChange={setVal} />
      </div>
    );
  },
};

export const Number: Story = {
  args: {
    label: "Amount",
    type: "number",
    placeholder: "0",
    clearable: true,
  },
  render: (args) => {
    const [val, setVal] = useState("120");
    return (
      <div style={{ width: 420 }}>
        <Input {...args} value={val} onChange={setVal} />
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    label: "Username",
    placeholder: "Your name",
    clearable: true,
    error: "This username is already taken.",
  },
  render: (args) => {
    const [val, setVal] = useState("admin");
    return (
      <div style={{ width: 420 }}>
        <Input {...args} value={val} onChange={setVal} />
      </div>
    );
  },
};
