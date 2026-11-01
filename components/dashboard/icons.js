export function Icon({ children, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function HomeIcon({ className }) { return <Icon className={className}><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" /><path d="M9 21v-6h6v6" /></Icon>; }
export function FolderIcon({ className }) { return <Icon className={className}><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></Icon>; }
export function ClockIcon({ className }) { return <Icon className={className}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3 2" /></Icon>; }
export function StarIcon({ className }) { return <Icon className={className}><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /></Icon>; }
export function SearchIcon({ className }) { return <Icon className={className}><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></Icon>; }
export function BellIcon({ className }) { return <Icon className={className}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></Icon>; }
export function PlusIcon({ className }) { return <Icon className={className}><path d="M12 5v14M5 12h14" /></Icon>; }
export function CloseIcon({ className }) { return <Icon className={className}><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
export function MoreIcon({ className }) { return <Icon className={className}><circle cx="5" cy="12" r=".7" fill="currentColor" /><circle cx="12" cy="12" r=".7" fill="currentColor" /><circle cx="19" cy="12" r=".7" fill="currentColor" /></Icon>; }
export function FileIcon({ className }) { return <Icon className={className}><path d="M6 3h7l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" /><path d="M13 3v6h6" /><path d="M8 14h8M8 17h5" /></Icon>; }
export function StorageIcon({ className }) { return <Icon className={className}><ellipse cx="12" cy="5" rx="7" ry="2.5" /><path d="M5 5v7c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5" /><path d="M5 12v7c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-7" /></Icon>; }
