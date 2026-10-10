@echo off
title AI Resume Analyzer - Push to GitHub
cd /d "%~dp0"

echo ============================================================
echo   AI Resume Analyzer - GitHub Push ^& Official Sign-in Flow
echo ============================================================
echo.
echo Destination : https://nagarajusonga939@github.com/nagarajusonga939/AI-Resume.git
echo Local Branch: main
echo.
echo Attempting to push project files to GitHub...
echo When the browser window opens, please complete GitHub sign-in for 'nagarajusonga939'.
echo.

git push -u origin main
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Remote has existing commits on main. Pulling and integrating...
    git pull origin main --allow-unrelated-histories --no-edit -X ours
    echo.
    echo Pushing complete merged project to GitHub...
    git push -u origin main
)

echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo SUCCESS: All project files including /src have been pushed!
    echo Vercel build will now resolve /src/main.jsx and pass!
    echo ============================================================
) else (
    echo ============================================================
    echo PUSH FAILED: Please review the error message above.
    echo ============================================================
)

echo.
pause
