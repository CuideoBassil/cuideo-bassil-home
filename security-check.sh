#!/bin/bash

# Security Pre-Deployment Check Script
# Run this before deploying to Digital Ocean

set -e

echo "🔒 Starting Security Pre-Deployment Checks..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check 1: Verify no suspicious scripts
echo "1️⃣ Checking for suspicious scripts..."
if grep -r "segfault.net\|deploy-all.sh" . --exclude-dir={node_modules,.next,.git} 2>/dev/null; then
    echo -e "${RED}❌ FAIL: Suspicious scripts found!${NC}"
    exit 1
else
    echo -e "${GREEN}✅ PASS: No suspicious scripts found${NC}"
fi
echo ""

# Check 2: Verify package.json doesn't have suspicious scripts
echo "2️⃣ Checking package.json scripts..."
if grep -E "(postinstall|preinstall).*wget|curl|bash" package.json 2>/dev/null; then
    echo -e "${RED}❌ FAIL: Suspicious install scripts found!${NC}"
    exit 1
else
    echo -e "${GREEN}✅ PASS: Package.json scripts look clean${NC}"
fi
echo ""

# Check 3: Run yarn audit
echo "3️⃣ Running yarn audit..."
if yarn audit --level moderate --groups dependencies; then
    echo -e "${GREEN}✅ PASS: No moderate or higher vulnerabilities${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: Vulnerabilities found. Review before deploying.${NC}"
    echo "Run 'yarn audit' to see details"
fi
echo ""

# Check 4: Verify lockfile exists
echo "4️⃣ Verifying lockfile..."
if [ -f "yarn.lock" ] || [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✅ PASS: Lockfile exists${NC}"
else
    echo -e "${RED}❌ FAIL: No lockfile found! This is a security risk.${NC}"
    exit 1
fi
echo ""

# Check 5: Verify .npmrc exists
echo "5️⃣ Checking for .npmrc security config..."
if [ -f ".npmrc" ]; then
    echo -e "${GREEN}✅ PASS: .npmrc exists${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: .npmrc not found. Creating one...${NC}"
    cat > .npmrc << EOF
save-exact=true
audit=true
audit-level=high
EOF
    echo -e "${GREEN}✅ Created .npmrc${NC}"
fi
echo ""

# Check 6: Verify Dockerfile exists
echo "6️⃣ Checking for Dockerfile..."
if [ -f "Dockerfile" ]; then
    echo -e "${GREEN}✅ PASS: Dockerfile exists${NC}"
    
    # Verify it has security features
    if grep -q "ignore-scripts" Dockerfile && grep -q "adduser.*nextjs" Dockerfile; then
        echo -e "${GREEN}✅ PASS: Dockerfile has security features${NC}"
    else
        echo -e "${YELLOW}⚠️  WARNING: Dockerfile may be missing security features${NC}"
    fi
else
    echo -e "${RED}❌ FAIL: No Dockerfile found!${NC}"
    exit 1
fi
echo ""

# Check 7: Check for hardcoded secrets
echo "7️⃣ Checking for hardcoded secrets..."
if grep -rE "(api[_-]?key|password|secret|token).*=.*['\"][^'\"]{20,}" . \
    --exclude-dir={node_modules,.next,.git} \
    --exclude="*.md" \
    --exclude="security-check.sh" 2>/dev/null | grep -v "NEXT_PUBLIC"; then
    echo -e "${RED}❌ FAIL: Potential hardcoded secrets found!${NC}"
    echo "Review the files above and move secrets to environment variables"
    exit 1
else
    echo -e "${GREEN}✅ PASS: No obvious hardcoded secrets found${NC}"
fi
echo ""

# Check 8: Verify environment setup
echo "8️⃣ Checking environment configuration..."
if [ -f ".env.local" ] || [ -f ".env.production" ]; then
    echo -e "${GREEN}✅ PASS: Environment files exist${NC}"
    
    # Check if .env files are in .gitignore
    if grep -q "\.env" .gitignore; then
        echo -e "${GREEN}✅ PASS: .env files are gitignored${NC}"
    else
        echo -e "${RED}❌ FAIL: .env files not in .gitignore!${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  WARNING: No environment files found${NC}"
fi
echo ""

# Check 9: Check Next.js config
echo "9️⃣ Checking Next.js configuration..."
if grep -q "output.*standalone" next.config.js; then
    echo -e "${GREEN}✅ PASS: Standalone output configured${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: Standalone output not configured${NC}"
    echo "Add 'output: \"standalone\"' to next.config.js for Docker optimization"
fi
echo ""

# Check 10: Verify health check endpoint
echo "🔟 Checking health check endpoint..."
if [ -f "src/app/api/health/route.js" ] || [ -f "pages/api/health.js" ]; then
    echo -e "${GREEN}✅ PASS: Health check endpoint exists${NC}"
else
    echo -e "${YELLOW}⚠️  WARNING: No health check endpoint found${NC}"
    echo "Create one for Docker health monitoring"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Security checks completed!${NC}"
echo ""
echo "Next steps:"
echo "1. Review any warnings above"
echo "2. Run: docker build -t cuideo-home:secure ."
echo "3. Run: docker scan cuideo-home:secure"
echo "4. Follow DEPLOYMENT-GUIDE.md for deployment"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
