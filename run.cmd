@echo off
setlocal ENABLEDELAYEDEXPANSION

if %1 == pro (

  echo * starting puzzle-games-app
  cmd /c "npm run start" -new_console:t:"app"
  cmd /c "npm run storybook" -new_console:t:"storybook"
)