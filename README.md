# GTI Google-like Gallery

Clean, professional, light-themed app with theme toggle. Flow: **Brand → Pack Type → Images → Carousel**.

## Run
```bash
pnpm i   # or npm i / yarn
pnpm dev # http://localhost:3000
pnpm build && pnpm start
```

## Assets
```
public/images/<brand>/<pack>/<nn>.jpg
e.g. public/images/milano/kings/01.jpg
```
Replace logos in `public/logos/`. Edit `lib/data.ts` to change brands/packs/images.
