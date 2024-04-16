import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { userData, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>
          <User size={150} className="avatar" />
          {userData.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Welcome {userData.role === "admin" ? "Admin" : "User"}
          Email: {userData.email}
          Role: {userData.role}
        </CardDescription>
      </CardContent>
      <Button onClick={handleLogout}>Logout</Button>
    </Card>
  );
};

export default Dashboard;
