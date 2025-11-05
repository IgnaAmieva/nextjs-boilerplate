"use client";
import { useAuth } from "@/src/hooks/useAuth";
import AdminPanel from "@/app/admin/panel";
import LoginBox from "@/app/admin/signin";

export default function AdminIndex() {
  const { user, loading } = useAuth();
  if (loading) return <main className="pt-24 container-tbv">Cargando...</main>;
  return user ? <AdminPanel/> : <LoginBox/>;
}
