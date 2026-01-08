import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { supabase } from "@/lib/supabase"

// Simple in-memory rate limiter (resets on server restart)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // 3 requests per minute

interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
    honeypot?: string // Spam protection field
}

function getClientIP(request: NextRequest): string {
    return request.headers.get("x-forwarded-for")?.split(",")[0] ||
        request.headers.get("x-real-ip") ||
        "unknown"
}

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const record = rateLimitStore.get(ip)

    if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
        rateLimitStore.set(ip, { count: 1, timestamp: now })
        return false
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return true
    }

    record.count++
    return false
}

export async function POST(request: NextRequest) {
    try {
        const clientIP = getClientIP(request)

        // Rate limiting check
        if (isRateLimited(clientIP)) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            )
        }

        const body: ContactFormData = await request.json()
        const { name, email, subject, message, honeypot } = body

        // Honeypot spam check - if this field has a value, it's likely a bot
        if (honeypot) {
            // Silently accept but don't process (don't alert bots)
            return NextResponse.json(
                { message: "Message received successfully" },
                { status: 200 }
            )
        }

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            )
        }

        // Validate field lengths
        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return NextResponse.json(
                { error: "Field length exceeds maximum allowed" },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        // Store in Supabase as backup (always attempt this)
        try {
            await supabase.from("contact_submissions").insert({
                name,
                email,
                subject,
                message,
                ip_address: clientIP,
                created_at: new Date().toISOString()
            })
        } catch (dbError) {
            console.error("Failed to store in Supabase:", dbError)
            // Continue even if DB storage fails
        }

        // Send email via Resend if API key is configured
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY)
                await resend.emails.send({
                    from: "Portfolio Contact <onboarding@resend.dev>",
                    to: "omotoyeodewole@gmail.com",
                    replyTo: email,
                    subject: `[Portfolio] ${subject}`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
                                New Contact Form Submission
                            </h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px 0; color: #666; width: 100px;"><strong>Name:</strong></td>
                                    <td style="padding: 10px 0;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                                    <td style="padding: 10px 0;">
                                        <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666;"><strong>Subject:</strong></td>
                                    <td style="padding: 10px 0;">${subject}</td>
                                </tr>
                            </table>
                            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                                <strong style="color: #666;">Message:</strong>
                                <p style="white-space: pre-wrap; margin-top: 10px; line-height: 1.6;">
                                    ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                                </p>
                            </div>
                            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                                Sent from your portfolio contact form
                            </p>
                        </div>
                    `
                })
            } catch (emailError) {
                console.error("Failed to send email via Resend:", emailError)
                // Message is stored in DB, so we can still return success
            }
        } else {
            // Fallback: Log to console in development
            console.log("=== New Contact Form Submission ===")
            console.log(`Name: ${name}`)
            console.log(`Email: ${email}`)
            console.log(`Subject: ${subject}`)
            console.log(`Message: ${message}`)
            console.log("===================================")
        }

        return NextResponse.json(
            { message: "Message received successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Contact form error:", error)
        return NextResponse.json(
            { error: "Failed to process message" },
            { status: 500 }
        )
    }
}
