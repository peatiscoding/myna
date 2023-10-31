import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanMessage } from 'langchain/schema'

// ESM: relative need .js suffix
import { config } from './config.js'

console.log('initializing with', config.openAI.key)

// Engines
const llm = new OpenAI({
  openAIApiKey: config.openAI.key,
  temperature: 0.9,
})
const chatModel = new ChatOpenAI({
  openAIApiKey: config.openAI.key,
})

// Intercept inputs
const text = 'what would be a good name for the CDP project?'
const messages = [new HumanMessage({ content: text })]
console.info('Prompt >', text)

// Predict results
const [llmResult, chatModelResult] = await Promise.all([
  llm.predictMessages(messages),
  chatModel.predictMessages(messages),
])

// Output
console.log('llmResult', llmResult)
console.log('chatModelResult', chatModelResult)
