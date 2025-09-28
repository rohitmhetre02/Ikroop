#!/bin/bash

# Create the new src directory structure
mkdir -p src/components/ui
mkdir -p src/components/figma
mkdir -p src/contexts
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/guidelines

# Copy all components
cp components/*.tsx src/components/
cp -r components/ui/* src/components/ui/
cp -r components/figma/* src/components/figma/

# Copy contexts, hooks, lib, and guidelines
cp contexts/*.tsx src/contexts/
cp hooks/*.ts src/hooks/
cp lib/*.ts src/lib/
cp -r guidelines/* src/guidelines/

# Remove old directories (uncomment when you're ready)
# rm -rf components contexts hooks lib styles guidelines App.tsx

echo "Project structure reorganized successfully!"
echo "Your new structure:"
echo "src/"
echo "├── App.tsx"
echo "├── main.tsx"
echo "├── styles/"
echo "│   └── globals.css"
echo "├── components/"
echo "├── contexts/"
echo "├── hooks/"
echo "├── lib/"
echo "└── guidelines/"
echo ""
echo "Next steps:"
echo "1. Run: chmod +x reorganize-project.sh"
echo "2. Run: ./reorganize-project.sh"
echo "3. Install dependencies: npm install"
echo "4. Test locally: npm run dev"
echo "5. Deploy to Vercel!"