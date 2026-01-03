# Security Policy

## Supported Versions

The latest version of Wealth Compass is currently supported.

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to the project owner. All security vulnerabilities will be promptly addressed.

## Critical Security Controls

This application relies on Supabase for backend security. 

> [!IMPORTANT]
> **Row Level Security (RLS)**: The client-side application contains "soft" security checks for user experience. **Real security must be enforced by RLS policies on Supabase tables.** Ensure all tables (`profiles`, `assets`, etc.) have RLS enabled and policies restrict access to `auth.uid()`.

## Environment Variables

The following environment variables are critical for security:

- `VITE_SUPABASE_URL`: Your Supabase project URL.
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous public key.
- `VITE_ALLOWED_EMAIL`: (Optional) Restricts login to a specific email address on the client side.

**Never commit `.env` files containing real secrets (service_role keys) to the repository.**
