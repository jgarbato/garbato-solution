import type { Mockup, ProductTheme } from "@/lib/products/types"

type Props = {
  mockup: Mockup
  theme: ProductTheme
}

export default function DashboardMockup({ mockup, theme }: Props) {
  const { domain, logoIcon: LogoIcon, sidebarIcons, header, stats, items } = mockup

  return (
    <div
      className="w-full rounded-2xl overflow-hidden"
      style={{
        boxShadow: `0 24px 64px rgba(${theme.shadowRgba},0.14)`,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ background: theme.bgTinted, borderBottom: `1px solid ${theme.border}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span
          className="flex-1 mx-3 rounded text-[10px] text-center py-0.5 px-2"
          style={{ background: "white", color: theme.muted }}
        >
          {domain}
        </span>
      </div>

      {/* App layout */}
      <div className="flex" style={{ background: theme.bgSoft, height: 320 }}>
        {/* Sidebar */}
        <div
          className="w-12 flex flex-col items-center py-3 gap-2.5 flex-shrink-0"
          style={{ background: theme.primary }}
        >
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <LogoIcon className="w-3.5 h-3.5 text-white" />
          </div>
          {sidebarIcons.map((Icon, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: i === 0 ? "rgba(255,255,255,0.18)" : "transparent" }}
            >
              <Icon className="w-3.5 h-3.5 text-white/70" />
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[12px] font-bold" style={{ color: theme.dark }}>{header.title}</p>
              <p className="text-[10px]" style={{ color: theme.muted }}>{header.subtitle}</p>
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: header.badge.bg, color: header.badge.color }}
            >
              {header.badge.label}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg p-2"
                style={{ background: "white", border: `1px solid ${theme.border}` }}
              >
                <p className="text-[13px] font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[9px] mt-0.5" style={{ color: theme.muted }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Items */}
          <div className="flex flex-col gap-1.5">
            {items.map((it) => (
              <div
                key={it.leftBadge + it.title}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5"
                style={{ background: "white", border: `1px solid ${theme.border}` }}
              >
                <span
                  className={`text-[9px] font-semibold flex-shrink-0 ${
                    it.leftBadgeWidth === "wide" ? "w-12" : "w-9"
                  }`}
                  style={{ color: theme.primary }}
                >
                  {it.leftBadge}
                </span>
                {it.showAvatar && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0"
                    style={{ background: theme.primary }}
                  >
                    {it.title[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold truncate" style={{ color: theme.dark }}>{it.title}</p>
                  <p className="text-[8px]" style={{ color: theme.muted }}>{it.subtitle}</p>
                </div>
                {it.rightExtra && (
                  <span className="text-[9px] font-semibold flex-shrink-0" style={{ color: theme.dark }}>
                    {it.rightExtra}
                  </span>
                )}
                <span
                  className="text-[8px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{ background: `${it.statusColor}18`, color: it.statusColor }}
                >
                  {it.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
