import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import UserDetails from "@/components/User/UserDetails";
export default async function Index() {
  return (
    <>
      <Navbar />
      <UserDetails />
    </>
  );
}
