import express from 'express'
import { z } from 'zod'
import data from './services/data.json'

const app = express()
app.use(express.json())

const PORT = 3000

const characterSchema = z.object({
  name: z.string().min(2).max(20),
  gender: z.enum(['Male', 'Female']),
  first_appearance: z.string().min(2).max(30),
  occupation: z.string().min(2).max(20),
  species: z.string().min(2).max(20),
  image: z.string().url()
})

type Character = z.infer<typeof characterSchema>

const characters: Character[] = data as Character[]

app.get('/', (_req, res) => {
  res.json(characters)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
