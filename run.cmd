@echo off
setlocal ENABLEDELAYEDEXPANSION

if %1 == pro (

  echo * starting puzzle-games-app
  cmd /c "yarn start" -new_console:t:"app"
  cmd /c "yarn storybook" -new_console:t:"storybook"
)
