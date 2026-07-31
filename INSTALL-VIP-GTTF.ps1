param(
  [string]$ProjectPath = "C:\Users\seain\Desktop\puirtyofheartsreal"
)

$ErrorActionPreference = "Stop"
$release = Join-Path $PSScriptRoot "puirtyofheartsreal-main"
if (-not (Test-Path $release)) { $release = $PSScriptRoot }

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Remove-Item "$ProjectPath\.next" -Recurse -Force -ErrorAction SilentlyContinue

robocopy $release $ProjectPath /E /XD ".git" "node_modules" ".next" /XF ".env" ".env.local" ".env.production" ".env.development"
if ($LASTEXITCODE -gt 7) { throw "Copy failed with robocopy code $LASTEXITCODE" }

Set-Location $ProjectPath
npm install
npm run typecheck
Write-Host "Code installed. Now run: npx supabase db push" -ForegroundColor Yellow
Write-Host "Then open /dashboard/admin/vip to grant VIP access." -ForegroundColor Green
