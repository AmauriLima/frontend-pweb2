import { Outlet } from "react-router";

export const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="max-w-sm w-full">
        <Outlet />
      </div>
    </div>
  );
}
