@echo off
echo Setting up Portfolio Backend...
echo.

echo Installing backend dependencies...
cd backend
call npm install

echo.
echo Backend setup complete!
echo.
echo To start the backend server, run:
echo   cd backend
echo   npm run dev
echo.
echo Don't forget to update the .env file with your email credentials!
echo.
pause
