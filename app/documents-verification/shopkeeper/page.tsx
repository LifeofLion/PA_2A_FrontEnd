"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-context"
import Link from "next/link"

export default function ShopkeeperDocumentsPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const [formData, setFormData] = useState({
    siret: "",
    siren: "",
  })
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const areAllFieldsFilled = (): boolean => {
    return Object.values(formData).every((value) => value.trim() !== "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Réinitialiser l'erreur

    if (!areAllFieldsFilled()) {
      setError(t("auth.allFieldsRequired"))
      return
    }

    setIsSubmitting(true)

    try {
      // Simuler l'envoi des données
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Rediriger vers la page de pending validation pour les commerçants
      router.push("/documents-verification/pending-validation/shopkeeper")
    } catch (err) {
      console.error("Error submitting documents:", err)
      setError(t("auth.submissionFailed"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-center text-green-50 mb-6">
            {t("shopkeeper.enterSiretAndSiren")}
          </h2>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SIRET */}
            <div>
              <label htmlFor="siret" className="block text-gray-700 mb-2">
                {t("shopkeeper.siretNumber")}
              </label>
              <input
                id="siret"
                name="siret"
                type="text"
                value={formData.siret}
                onChange={handleChange}
                placeholder={t("shopkeeper.enterSiretNumber")}
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* SIREN */}
            <div>
              <label htmlFor="siren" className="block text-gray-700 mb-2">
                {t("shopkeeper.sirenNumber")}
              </label>
              <input
                id="siren"
                name="siren"
                type="text"
                value={formData.siren}
                onChange={handleChange}
                placeholder={t("shopkeeper.enterSirenNumber")}
                className="w-full px-4 py-3 rounded-md bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-md text-white ${
                isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-green-50 hover:bg-green-500"
              }`}
            >
              {isSubmitting ? t("auth.submitting") : t("common.submit")}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}