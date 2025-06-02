"use client"

import type React from "react"

import { DashboardContent } from "@/components/back-office/dashboard-content"
import ResponsiveHeader from "./responsive-header"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  ChevronDown,
  LogOut,
  Menu,
  Angry,
  Tags,
  Edit,
  BadgeDollarSign,
  Languages,
  UserRoundCog,
  User,
} from "lucide-react"
import { useLanguage } from "@/components/language-context"
import LanguageSelector from "@/components/language-selector"


export default function DashboardPage() {
  const { t } = useLanguage()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-gray-50 lg:flex-row">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin" className="flex items-center">
              <Image src="/logo.png" alt="EcoDeli" width={120} height={40} className="h-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center rounded-md bg-green-50 px-4 py-3 text-white"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <span>{t("admin.dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <UserRoundCog className="mr-3 h-5 w-5" />
                  <span>{t("admin.users")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/services"
                  className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <Tags className="mr-3 h-5 w-5" />
                  <span>{t("admin.services")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/translations"
                  className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <Languages className="mr-3 h-5 w-5" />
                  <span>{t("admin.translations")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/complaints"
                  className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <Angry className="mr-3 h-5 w-5" />
                  <span>{t("admin.complaints")}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/finance"
                  className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <BadgeDollarSign className="mr-3 h-5 w-5" />
                  <span>{t("admin.finance")}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        {/* Header */}
        <ResponsiveHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  )
}

