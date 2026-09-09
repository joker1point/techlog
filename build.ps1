Set-Location "C:\Users\biren\WorkBuddy\2026-06-04-11-30-28\my-tech-blog"
$env:EXPORT = "true"
npm run build 2>&1 | Out-File -FilePath "build.log" -Encoding utf8
"EXIT_CODE=$LASTEXITCODE" | Out-File -FilePath "build.log" -Encoding utf8 -Append
