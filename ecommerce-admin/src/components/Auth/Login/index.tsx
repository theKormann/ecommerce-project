"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLogin() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("http://localhost:8080/auth/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })

    if (res.ok) {
      const data = await res.json()

      if (data.role === "ADMIN") {
        localStorage.setItem("token", data.token)
        router.push("/admin/menu")
      } else {
        setError("Você não tem permissão para acessar o painel administrativo.")
      }
    } else {
      setError("Credenciais inválidas.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">E-commerce Hovet Lilicão Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login">Login</Label>
              <Input
                type="login"
                id="login"
                placeholder="insira seu email ou usuário"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                placeholder="insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Entrar Como Administrador
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
