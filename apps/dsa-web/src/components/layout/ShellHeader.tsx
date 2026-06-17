import type React from "react";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Home,
  Menu,
  MessageSquareQuote,
  Settings2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAgentChatStore } from "../../stores/agentChatStore";
import { useUiLanguage } from "../../contexts/UiLanguageContext";
import type { UiTextKey } from "../../i18n/uiText";
import { UiLanguageToggle } from "../i18n/UiLanguageToggle";
import { ThemeToggle } from "../theme/ThemeToggle";
import { cn } from "../../utils/cn";
import { StatusDot } from "../common/StatusDot";

type ShellHeaderProps = {
  onOpenMobileNav: () => void;
};

type TopNavItem = {
  key: string;
  labelKey: UiTextKey;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: "completion";
};

const TOP_NAV_ITEMS: TopNavItem[] = [
  {
    key: "home",
    labelKey: "layout.nav.home",
    to: "/",
    icon: Home,
    exact: true,
  },
  {
    key: "chat",
    labelKey: "layout.nav.chat",
    to: "/chat",
    icon: MessageSquareQuote,
    badge: "completion",
  },
  {
    key: "portfolio",
    labelKey: "layout.nav.portfolio",
    to: "/portfolio",
    icon: BriefcaseBusiness,
  },
  {
    key: "backtest",
    labelKey: "layout.nav.backtest",
    to: "/backtest",
    icon: BarChart3,
  },
  { key: "alerts", labelKey: "layout.nav.alerts", to: "/alerts", icon: Bell },
];

export const ShellHeader: React.FC<ShellHeaderProps> = ({
  onOpenMobileNav,
}) => {
  const { t } = useUiLanguage();
  const completionBadge = useAgentChatStore((state) => state.completionBadge);

  return (
    <header className="sticky top-0 z-30 h-[64px] border-b border-border/60 bg-background/84 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-full max-w-[1680px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/70 bg-card/70 text-secondary-text transition-colors hover:bg-hover hover:text-foreground lg:hidden"
          aria-label={t("layout.openNav")}
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-gradient text-[hsl(var(--primary-foreground))] shadow-[0_12px_28px_var(--nav-brand-shadow)]">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="hidden font-semibold text-foreground sm:block">
            DSA
          </span>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          {TOP_NAV_ITEMS.map(
            ({ key, labelKey, to, icon: Icon, exact, badge }) => {
              const label = t(labelKey);
              return (
                <NavLink
                  key={key}
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    cn(
                      "group flex h-9 items-center gap-2 px-4 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-[var(--nav-active-bg)] text-[hsl(var(--primary))] border border-[var(--nav-active-border)]"
                        : "text-secondary-text hover:bg-[var(--nav-hover-bg)] hover:text-foreground",
                    )
                  }
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {badge === "completion" && completionBadge ? (
                    <StatusDot
                      tone="info"
                      data-testid="chat-completion-badge"
                      className="border-2 border-background shadow-[0_0_10px_var(--nav-indicator-shadow)]"
                      aria-label={t("layout.newChatMessage")}
                    />
                  ) : null}
                </NavLink>
              );
            },
          )}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex h-9 items-center gap-2 px-4 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[var(--nav-active-bg)] text-[hsl(var(--primary))] border border-[var(--nav-active-border)]"
                  : "text-secondary-text hover:bg-[var(--nav-hover-bg)] hover:text-foreground",
              )
            }
            aria-label={t("layout.nav.settings")}
          >
            <Settings2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t("layout.nav.settings")}</span>
          </NavLink>

          <UiLanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
