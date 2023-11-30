export const config = {
	openAI: {
		key: process.env.OPENAI_KEY,
	},
	ollama: {
		baseUrl: 'http://localhost:11434',
		defaultModel: 'mistral',
	},
}
