[CmdletBinding()]
param(
    [string]$ProjectPath = "$HOME\Desktop\puirtyofheartsreal",
    [string]$RepositoryUrl = "https://github.com/seaintCO/puirtyofheartsreal.git",
    [switch]$SkipInstall,
    [switch]$SkipTypecheck
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Invoke-Checked {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [string]$Command,

        [Parameter()]
        [AllowEmptyCollection()]
        [string[]]$CommandArguments = @()
    )

    & $Command @CommandArguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Command failed with exit code $LASTEXITCODE."
    }
}

$releasePath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectFullPath = [System.IO.Path]::GetFullPath($ProjectPath)
$releaseFullPath = [System.IO.Path]::GetFullPath($releasePath)

Write-Host "Purity Of Hearts secure main release" -ForegroundColor Magenta
Write-Host "Release: $releaseFullPath"
Write-Host "Project: $projectFullPath"

Get-Process node -ErrorAction SilentlyContinue |
    Stop-Process -Force -ErrorAction SilentlyContinue

if (-not (Test-Path $projectFullPath)) {
    New-Item -ItemType Directory -Path $projectFullPath -Force | Out-Null
}

if (-not (Test-Path (Join-Path $projectFullPath ".git"))) {
    throw "The target folder is not a Git repository. Clone $RepositoryUrl into $projectFullPath first so its history is preserved."
}

$environmentBackup = Join-Path $env:TEMP "purity-of-hearts-env-$([guid]::NewGuid().ToString('N')).local"
$environmentPath = Join-Path $projectFullPath ".env.local"
$hadEnvironment = Test-Path $environmentPath

if ($hadEnvironment) {
    Copy-Item $environmentPath $environmentBackup -Force
}

Set-Location $projectFullPath

$originExists = (git remote) -contains "origin"
if ($originExists) {
    Invoke-Checked -Command "git" -CommandArguments @("remote", "set-url", "origin", $RepositoryUrl)
} else {
    Invoke-Checked -Command "git" -CommandArguments @("remote", "add", "origin", $RepositoryUrl)
}

Invoke-Checked -Command "git" -CommandArguments @("fetch", "origin", "main")

$dirtyBeforeInstall = @(git status --porcelain)
if ($dirtyBeforeInstall.Count -gt 0) {
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    Invoke-Checked -Command "git" -CommandArguments @(
        "stash",
        "push",
        "--include-untracked",
        "-m",
        "Automatic backup before Purity Of Hearts secure release $stamp"
    )
    Write-Host "Existing uncommitted work was preserved in a Git stash." -ForegroundColor Yellow
}

$currentBranch = (git branch --show-current).Trim()
if ($currentBranch -ne "main") {
    Invoke-Checked -Command "git" -CommandArguments @("switch", "main")
}

Invoke-Checked -Command "git" -CommandArguments @("pull", "--ff-only", "origin", "main")

if ($releaseFullPath.TrimEnd('\') -ne $projectFullPath.TrimEnd('\')) {
    robocopy `
        $releaseFullPath `
        $projectFullPath `
        /E `
        /XD ".git" "node_modules" ".next" `
        /XF ".env" ".env.local" ".env.production" ".env.development" `
        /R:2 `
        /W:1 `
        /NFL `
        /NDL `
        /NJH `
        /NJS

    if ($LASTEXITCODE -gt 7) {
        throw "The release copy failed with robocopy exit code $LASTEXITCODE."
    }
}

if ($hadEnvironment) {
    Copy-Item $environmentBackup $environmentPath -Force
    Remove-Item $environmentBackup -Force -ErrorAction SilentlyContinue
}

Remove-Item (Join-Path $projectFullPath ".next") -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem (Join-Path $projectFullPath "src") -Recurse -File -Include "*.bak" -ErrorAction SilentlyContinue |
    Remove-Item -Force -ErrorAction SilentlyContinue

Set-Location $projectFullPath

if (-not $SkipInstall) {
    if (Test-Path (Join-Path $projectFullPath "package-lock.json")) {
        Invoke-Checked -Command "npm" -CommandArguments @("ci")
    } else {
        Invoke-Checked -Command "npm" -CommandArguments @("install")
    }
}

if (-not $SkipTypecheck) {
    Invoke-Checked -Command "npm" -CommandArguments @("run", "typecheck")
}

$requiredSecurityFiles = @(
    "next.config.ts",
    "src/proxy.ts",
    "src/lib/supabase/proxy.ts",
    "src/lib/security/request.ts",
    "src/lib/security/redirects.ts",
    "supabase/migrations/20260730231500_auth_security_hardening.sql"
)

foreach ($requiredFile in $requiredSecurityFiles) {
    if (-not (Test-Path (Join-Path $projectFullPath $requiredFile))) {
        throw "Required security file is missing: $requiredFile"
    }
}

Invoke-Checked -Command "git" -CommandArguments @("add", "-A")

$forbiddenTrackedFiles = @(
    git diff --cached --name-only --diff-filter=ACMR |
        Where-Object {
            $_ -match '(^|/)\.env($|\.)' -and
            $_ -notmatch '(^|/)\.env\.example$'
        }
)

if ($forbiddenTrackedFiles.Count -gt 0) {
    Invoke-Checked -Command "git" -CommandArguments @("reset")
    throw "A private environment file was about to be committed: $($forbiddenTrackedFiles -join ', ')"
}

$stagedDiff = git diff --cached --no-ext-diff --unified=0
$secretPattern = '(?i)(sk_live_(?!REPLACE)[A-Za-z0-9_-]{16,}|sk_test_(?!REPLACE)[A-Za-z0-9_-]{16,}|sb_secret_(?!REPLACE)[A-Za-z0-9_-]{16,}|whsec_(?!REPLACE)[A-Za-z0-9_-]{16,})'
if ($stagedDiff -match $secretPattern) {
    Invoke-Checked -Command "git" -CommandArguments @("reset")
    throw "A likely live credential was detected in the staged changes. Nothing was committed."
}

if (-not (git config user.name)) {
    Invoke-Checked -Command "git" -CommandArguments @("config", "user.name", "seaintCO")
}
if (-not (git config user.email)) {
    Invoke-Checked -Command "git" -CommandArguments @("config", "user.email", "seaintCO@users.noreply.github.com")
}

$hasStagedChanges = -not [string]::IsNullOrWhiteSpace((git diff --cached --name-only | Out-String))
if ($hasStagedChanges) {
    Invoke-Checked -Command "git" -CommandArguments @(
        "commit",
        "-m",
        "Launch secure Purity Of Hearts liquid-glass platform"
    )
} else {
    Write-Host "No new file changes were found to commit." -ForegroundColor Yellow
}

Invoke-Checked -Command "git" -CommandArguments @("push", "-u", "origin", "main")

$commit = (git rev-parse HEAD).Trim()
Write-Host ""
Write-Host "Main branch pushed successfully." -ForegroundColor Green
Write-Host "Commit: $commit"
Write-Host "Repository: $RepositoryUrl"
Write-Host ""
Write-Host "Required before production launch:" -ForegroundColor Yellow
Write-Host "  npx supabase db push"
Write-Host "This applies the included authentication/RLS hardening migration."
