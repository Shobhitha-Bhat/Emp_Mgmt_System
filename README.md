STEPS:

1. Create The Project:

\` npm create vite@latest employeeTaskManagementSystem \`
\` cd employeeTaskManagementSystem \`

2. Install Tailwind CSS

\` npm install tailwindcss @tailwindcss/vite \`

3. Configure Vite Plugin

\` 
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})

resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 \`


4. Import Tailwind CSS  - in index.css and include this in main.jsx

\` @import "tailwindcss";  \`

5. Create a jsconfig.json file in the root same as of package.json
\` {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
\`

6. Run the shadcn init command to setup project:
\` npx shadcn@latest init \`

7. 