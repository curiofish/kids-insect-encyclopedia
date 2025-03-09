# 이미지 디렉토리 목록
$directories = @(
    "images/intro",
    "images/butterflies",
    "images/beetles",
    "images/grasshoppers",
    "images/dragonflies",
    "images/bees_moths",
    "images/hemiptera",
    "images/not-insects",
    "images/quiz"
)

# cwebp 다운로드 및 설정
$cwebpUrl = "https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.3.2-windows-x64.zip"
$cwebpZip = "libwebp.zip"
$cwebpDir = "libwebp"

Write-Host "Downloading cwebp..."
Invoke-WebRequest -Uri $cwebpUrl -OutFile $cwebpZip

Write-Host "Extracting cwebp..."
Expand-Archive -Path $cwebpZip -DestinationPath $cwebpDir -Force
$cwebpExe = Join-Path -Path (Get-Location) -ChildPath (Join-Path -Path $cwebpDir -ChildPath "libwebp-1.3.2-windows-x64\bin\cwebp.exe")

# 각 디렉토리 처리
foreach ($dir in $directories) {
    Write-Host "`nProcessing directory: $dir"
    if (Test-Path $dir) {
        $images = Get-ChildItem -Path $dir -Filter "*.png"
        $images += Get-ChildItem -Path $dir -Filter "*.jpg"
        $images += Get-ChildItem -Path $dir -Filter "*.jpeg"

        foreach ($image in $images) {
            $outputPath = Join-Path -Path $dir -ChildPath ([System.IO.Path]::ChangeExtension($image.Name, "webp"))
            Write-Host "Converting: $($image.FullName) -> $outputPath"
            
            # cwebp 실행
            $process = Start-Process -FilePath $cwebpExe -ArgumentList "`"$($image.FullName)`" -o `"$outputPath`" -q 85" -Wait -NoNewWindow -PassThru
            
            if ($process.ExitCode -eq 0) {
                Write-Host "Successfully converted: $($image.Name)"
            } else {
                Write-Host "Failed to convert: $($image.Name)"
            }
        }
    } else {
        Write-Host "Skipping non-existent directory: $dir"
    }
}

# 임시 파일 정리
Remove-Item -Path $cwebpZip -Force
Remove-Item -Path $cwebpDir -Recurse -Force

Write-Host "`nImage optimization complete!" 