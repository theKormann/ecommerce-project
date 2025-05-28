"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboard, PlusCircle, PencilLine, Trash2 } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-6">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" />
            Painel Administrativo
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-6">
          <Button
            onClick={() => handleNavigate("/admin/products/create")}
            className="w-full justify-start gap-2"
            variant="default"
          >
            <PlusCircle className="w-5 h-5" />
            Criar Produto
          </Button>

          <Button
            onClick={() => handleNavigate("/admin/products/edit")}
            className="w-full justify-start gap-2"
            variant="secondary"
          >
            <PencilLine className="w-5 h-5" />
            Editar Produto
          </Button>

          <Button
            onClick={() => handleNavigate("/admin/products/delete")}
            className="w-full justify-start gap-2"
            variant="destructive"
          >
            <Trash2 className="w-5 h-5" />
            Excluir Produto
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
