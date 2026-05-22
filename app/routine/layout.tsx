import DashboardChrome from "@/components/dashboard/DashboardChrome";

export default function RoutineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
