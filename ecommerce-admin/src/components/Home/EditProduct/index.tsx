"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { toast } from "sonner" // <--- Adicionado aqui

export default function EditProduct() {
  const router = useRouter()

  const [id, setId] = useState("")
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [qtt, setQtt] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      setError("Você não está autenticado.")
      return
    }

    const response = await fetch("http://localhost:8080/product/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        productName,
        description,
        price: parseFloat(price),
        qtt: parseInt(qtt),
      }),
    })

    if (response.ok) {
      setSuccess("Produto editado com sucesso!")
      toast.success("Produto editado com sucesso!") // <--- Toast adicionado
      setProductName("")
      setDescription("")
      setPrice("")
      setQtt("")
      setError("")
      setTimeout(() => router.push("/admin/menu"), 2000)
    } else {
      const data = await response.json()
      setError(data.message || "Erro ao editar produto.")
      setSuccess("")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Editar Um Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="id">ID Produto</Label>
              <Input
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="productName">Nome do Produto</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="price">Preço</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="qtt">Quantidade</Label>
              <Input
                id="qtt"
                type="number"
                min="0"
                value={qtt}
                onChange={(e) => setQtt(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <Button type="submit" className="w-full">
              Editar produto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
