"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { toast } from "@/components/ui/toast" // sonner

export default function DeleteProduct() {
    const router = useRouter()

    const [id, setId] = useState("")
    const [productName, setProductName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [qtt, setQtt] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Você não está autenticado.")
            return
        }

        try {
            const response = await fetch(`http://localhost:8080/product/delete/${id}`, {
                method: "DELETE",
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
                toast.success("Produto excluído com sucesso!")
                setProductName("")
                setDescription("")
                setPrice("")
                setQtt("")
                setTimeout(() => router.push("/admin/menu"), 2000)
            } else {
                const data = await response.json()
                const errMsg = data.message || "Erro ao excluir produto."
                toast.error(errMsg)
            }
        } catch (err) {
            toast.error("Erro de conexão com o servidor.")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Excluir Um Produto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="id">ID do Produto</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="id"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    required
                                />
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button type="button" variant="outline">Selecionar</Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Selecione um ID</DrawerTitle>
                                            <div className="p-4">
                                                <Label htmlFor="product-id">ID</Label>
                                                <select
                                                    id="product-id"
                                                    value={id}
                                                    onChange={(e) => setId(e.target.value)}
                                                    className="mt-2 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring focus:ring-ring"
                                                >
                                                    <option value="" disabled>Selecione...</option>
                                                    {Array.from({ length: 1000 }, (_, i) => i + 1).map((value) => (
                                                        <option key={value} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </DrawerHeader>
                                    </DrawerContent>
                                </Drawer>


                            </div>
                        </div>

                        <Button type="submit" className="w-full">
                            Deletar Produto
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
