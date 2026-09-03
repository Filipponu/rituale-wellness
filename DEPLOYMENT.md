# Pubblicazione su Vercel con Supabase

1. Crea un progetto Supabase e apri **SQL Editor**.
2. Esegui `supabase/schema.sql`.
3. Su Vercel importa questa cartella come progetto.
4. In **Settings → Environment Variables**, aggiungi le tre variabili presenti in `.env.example`.
5. Collega le API del sito a Supabase prima del deploy in produzione: la versione locale usa ancora i file JSON.

Non inserire mai le chiavi Supabase nel frontend o in Git.
