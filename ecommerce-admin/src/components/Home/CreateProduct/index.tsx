"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function CreateProduct() {
  const router = useRouter()

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

    const response = await fetch("http://localhost:8080/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productName,
        description,
        price: parseFloat(price),
        qtt: parseInt(qtt),
      }),
    })

    if (response.ok) {
      setSuccess("Produto criado com sucesso!")
      setProductName("")
      setDescription("")
      setPrice("")
      setQtt("")
      setError("")
      setTimeout(() => router.push("/admin/menu"), 2000)
    } else {
      const data = await response.json()
      setError(data.message || "Erro ao criar produto.")
      setSuccess("")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Criar Novo Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              Criar Produto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
