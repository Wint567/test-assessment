import { useMemo, useState } from "react";
import styles from "./SidebarMenu.module.css";

export type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  children?: SidebarItem[];
};

export type SidebarMenuProps = {
  open: boolean;
  title?: string;
  items: SidebarItem[];
  onClose: () => void;
  onItemClick?: (item: SidebarItem) => void;
};

export function SidebarMenu({ open, title = "Menu", items, onClose, onItemClick }: SidebarMenuProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const hasNested = useMemo(() => items.some((i) => i.children?.length), [items]);

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleItem = (item: SidebarItem) => {
    onItemClick?.(item);
    if (item.href) onClose();
  };

  return (
    <div className={styles.root} data-open={open ? "true" : "false"}>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />

      <aside className={styles.panel} aria-label="Sidebar menu">
        <div className={styles.header}>
          <div className={styles.title}>
            {title} {hasNested ? <span className={styles.badge}>nested</span> : null}
          </div>
          <button className={styles.close} onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              level={0}
              expanded={expanded}
              onToggle={toggle}
              onClick={handleItem}
            />
          ))}
        </nav>
      </aside>
    </div>
  );
}

function MenuItem({
  item,
  level,
  expanded,
  onToggle,
  onClick,
}: {
  item: SidebarItem;
  level: number;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onClick: (item: SidebarItem) => void;
}) {
  const isExpandable = (item.children?.length ?? 0) > 0;
  const isOpen = expanded[item.id] === true;

  return (
    <div className={styles.item} style={{ paddingLeft: 12 + level * 12 }}>
      <div className={styles.row}>
        <button className={styles.link} onClick={() => (isExpandable ? onToggle(item.id) : onClick(item))}>
          <span>{item.label}</span>
          {isExpandable ? <span className={styles.chev}>{isOpen ? "▾" : "▸"}</span> : null}
        </button>
      </div>

      {isExpandable ? (
        <div className={styles.sub} data-open={isOpen ? "true" : "false"}>
          <div className={styles.subInner}>
            {item.children!.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                level={level + 1}
                expanded={expanded}
                onToggle={onToggle}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
