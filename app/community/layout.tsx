import DashboardChrome from "@/components/dashboard/DashboardChrome";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
