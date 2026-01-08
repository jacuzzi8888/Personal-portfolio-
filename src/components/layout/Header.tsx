
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Menu, Github, Linkedin, LogOut, User, FolderKanban, Mail, LayoutDashboard } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
]

export function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { session, signOut, checkSession } = useAuthStore()

    React.useEffect(() => {
        checkSession()
    }, [checkSession])

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = async () => {
        await signOut()
        router.push("/")
    }

    const isAdmin = !!session

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
                isScrolled && "bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
            )}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tight text-foreground">
                        Omotoye<span className="text-primary">.dev</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border/40">
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://github.com/omotoye-odewole" target="_blank" rel="noopener noreferrer">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                            <a href="https://linkedin.com/in/omotoye-odewole" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </Button>

                        {/* Admin Dropdown or Hire Me Button */}
                        {isAdmin ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="default" size="sm" className="ml-2 gap-2">
                                        <User className="h-4 w-4" />
                                        Admin
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem asChild>
                                        <Link href="/admin" className="cursor-pointer">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/projects" className="cursor-pointer">
                                            <FolderKanban className="mr-2 h-4 w-4" />
                                            My Projects
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button variant="default" size="sm" asChild className="ml-2">
                                <Link href="/#contact">
                                    Hire Me
                                </Link>
                            </Button>
                        )}
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4 mt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-lg font-medium transition-colors hover:text-primary",
                                        pathname === item.href ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {isAdmin && (
                                <>
                                    <Link
                                        href="/admin"
                                        className="text-lg font-medium text-primary hover:text-primary/80"
                                    >
                                        Admin Dashboard
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        className="w-full gap-2 mt-4"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Logout
                                    </Button>
                                </>
                            )}

                            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                                <a href="https://github.com/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                    <Github className="h-6 w-6" />
                                </a>
                                <a href="https://linkedin.com/in/omotoye-odewole" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                                    <Linkedin className="h-6 w-6" />
                                </a>
                                <a href="mailto:omotoyeodewole@gmail.com" className="text-muted-foreground hover:text-foreground">
                                    <Mail className="h-6 w-6" />
                                </a>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
