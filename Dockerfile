# ---------- Estágio 1: build (compila o TypeScript) ----------
FROM node:24-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@11

# Copia só os manifestos primeiro para aproveitar o cache de camadas
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm run build

# ---------- Estágio 2: runner (imagem final enxuta) ----------
FROM node:24-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm@11

# Somente dependências de produção
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Apenas o código compilado vindo do builder
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
