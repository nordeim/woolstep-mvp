# Check for vite cache
$ ls /home/project/woolset/node_modules/.vite/ 2>/dev/null && echo 'Vite cache exists' || echo 'No vite cache'
deps
vitest
Vite cache exists
# Clear vite cache and restart dev
$ rm -rf /home/project/woolset/node_modules/.vite/* 2>/dev/null; npx vite --clearScreen=false 2>&1 | head -20
(no output)
<bash_metadata>
bash tool terminated command after exceeding timeout 30000 ms. If this command is expected to take longer and is not waiting for interactive input, retry with a larger timeout value in milliseconds.
</bash_metadata>
# Clear vite cache
$ rm -rf /home/project/woolset/node_modules/.vite/*
(no output)

# TypeScript type check
npx tsc --noEmit 2>&1

# Run tests after fix
npx vitest run --reporter=verbose 2>&1

