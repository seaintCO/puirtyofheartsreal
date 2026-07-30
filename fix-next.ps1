$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "Repairing the local Next.js installation..." -ForegroundColor Cyan

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
}

if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force
}

npm cache verify

if (Test-Path "package-lock.json") {
    npm ci
} else {
    npm install
}

npm ls lucide-react --depth=0
npm run typecheck

Write-Host "Repair complete." -ForegroundColor Green
Write-Host "Start the site with: npm run dev" -ForegroundColor Yellow
