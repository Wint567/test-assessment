import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidebarMenu } from "./SidebarMenu";
import type { SidebarItem } from "./SidebarMenu";


const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const oneLevel: SidebarItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "contact", label: "Contact", href: "/contact" },
];

const twoLevels: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  {
    id: "products",
    label: "Products",
    children: [
      { id: "p1", label: "All products", href: "/products" },
      { id: "p2", label: "New product", href: "/products/new" },
      {
        id: "p3",
        label: "Categories",
        children: [
          { id: "c1", label: "Phones", href: "/products/cat/phones" },
          { id: "c2", label: "Accessories", href: "/products/cat/accessories" },
        ],
      },
    ],
  },
  { id: "settings", label: "Settings", href: "/settings" },
];

export const Closed: Story = {
  args: {
    open: false,
    title: "Menu",
    items: oneLevel,
    onClose: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <button onClick={() => setOpen(true)}>Open menu</button>
        <SidebarMenu
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onItemClick={(item) => console.log("clicked", item)}
        />
      </div>
    );
  },
};

export const OneLevelOpen: Story = {
  args: {
    open: true,
    title: "Menu",
    items: oneLevel,
    onClose: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <button onClick={() => setOpen(true)}>Open menu</button>
        <SidebarMenu {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

export const TwoLevelsOpen: Story = {
  args: {
    open: true,
    title: "Navigation",
    items: twoLevels,
    onClose: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: "100vh", padding: 24 }}>
        <button onClick={() => setOpen(true)}>Open menu</button>
        <SidebarMenu {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};
