import { RunnableSequence } from 'langchain/schema/runnable'
import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts'
import { BufferMemory } from 'langchain/memory'

import { ChatOllama } from 'langchain/chat_models/ollama'

// ESM: relative need .js suffix
import { config } from './config.js'

console.log('initializing with', config.ollama.baseUrl)

// Engines
const llm = new ChatOllama({
  baseUrl: config.ollama.baseUrl,
  model: config.ollama.defaultModel,
})

// Intercept inputs
const prompt = ChatPromptTemplate.fromMessages([
  ['system', 'You are a helpful chatbot'],
  new MessagesPlaceholder('history'),
  ['human', '{input}'],
])

const memory = new BufferMemory({
  returnMessages: true,
  inputKey: 'input',
  outputKey: 'output',
  memoryKey: 'history',
})

const chain = RunnableSequence.from([
  {
    input: (initialInput) => initialInput.input,
    memory: () => memory.loadMemoryVariables({}),
  },
  {
    input: (previousOutput) => previousOutput.input,
    history: (previousOutput) => previousOutput.memory.history,
  },
  prompt,
  llm,
])

// Predict results
const inputs = {
  input: 'Hello I am Peat',
}
const response = await chain.invoke(inputs)

console.log('Response', response.content)
// Output
await memory.saveContext(inputs, {
  output: response.content,
})

const inputs2 = {
  input: 'What is my name?',
}
const response2 = await chain.invoke(inputs2)
console.log('Response', response2.content)
