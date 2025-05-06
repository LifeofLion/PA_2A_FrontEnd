"use client"

import { Button } from "@/components/ui/button"
import { UserTable } from "@/components/user-table"
import { Plus } from "lucide-react"
import Link from "next/link"

export function UsersContent() {
  // Données fictives pour les différentes catégories d'utilisateurs
  const deliveryManData = [
    {
      id: 1,
      name: "BIDAUX",
      firstName: "Killian",
      email: "kbidaux@myges.fr",
      phone: "0636760421",
      status: "Click here",
      statusColor: "bg-[#8CD790] text-white",
    },
  ]

  const serviceProvidersData = [
    {
      id: 1,
      name: "BIDAUX",
      firstName: "Killian",
      email: "kbidaux@myges.fr",
      phone: "0636760421",
      status: "Accepted",
      statusColor: "bg-[#8CD790] text-white",
    },
  ]

  const shopkeepersData = [
    {
      id: 1,
      name: "BIDAUX",
      firstName: "Killian",
      email: "kbidaux@myges.fr",
      phone: "0636760421",
      status: "Rejected",
      statusColor: "bg-[#E57373] text-white",
    },
  ]

  const userData = [
    {
      id: 1,
      name: "BIDAUX",
      firstName: "Killian",
      email: "kbidaux@myges.fr",
      phone: "0636760421",
    },
  ]

  const administratorData = [
    {
      id: 1,
      name: "ZIDANE",
      firstName: "Véronique",
      email: "vzidane@myges.fr",
      phone: "0636760421",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link href="/users/add">
          <Button className="bg-[#8CD790] hover:bg-[#7ac57e] text-white">
            <Plus className="mr-2 h-4 w-4" />
            New administrator
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery man</h2>
          <UserTable data={deliveryManData} showJustificative={true} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Service providers</h2>
          <UserTable data={serviceProvidersData} showJustificative={true} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shopkeepers</h2>
          <UserTable data={shopkeepersData} showJustificative={true} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">User</h2>
          <UserTable data={userData} showJustificative={false} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Administrator</h2>
          <UserTable data={administratorData} showJustificative={false} />
        </div>
      </div>
    </div>
  )
}

