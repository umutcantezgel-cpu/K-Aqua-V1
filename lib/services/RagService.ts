import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize clients (ensure env variables exist in production)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

export class RagService {
  private indexName = process.env.PINECONE_INDEX || 'k-aqua-b2b';
  private pineconeClient: Pinecone | null = null;

  private getPinecone() {
    if (!this.pineconeClient) {
      this.pineconeClient = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || 'dummy-key' });
    }
    return this.pineconeClient;
  }

  /**
   * Embeds the user query and searches the Pinecone Vector DB
   */
  async retrieveContext(query: string, topK: number = 5): Promise<string> {
    try {
      // Use Gemini to create an embedding of the user query
      const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
      const embeddingResult = await model.embedContent(query);
      const vector = embeddingResult.embedding.values;

      const index = this.getPinecone().index(this.indexName);
      
      const queryResponse = await index.query({
        vector,
        topK,
        includeMetadata: true,
      });

      // Combine retrieved documents
      const contexts = queryResponse.matches
        .map((match) => match.metadata?.text as string)
        .filter(Boolean);

      return contexts.join('\n\n---\n\n');
    } catch (error) {
      console.error('RAG Retrieval failed:', error);
      // Fallback: return empty context so generation can still proceed with base knowledge
      return '';
    }
  }

  /**
   * Generates a streamed response based on the retrieved RAG context
   */
  async generateStream(query: string, context: string) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    
    const prompt = `Du bist der K-Aqua B2B Assistent.
Nutze das folgende technische Kontextwissen, um die Frage des Nutzers extrem präzise zu beantworten:

<CONTEXT>
${context}
</CONTEXT>

<USER_QUERY>
${query}
</USER_QUERY>
`;

    const result = await model.generateContentStream(prompt);
    return result.stream;
  }
}

export const ragService = new RagService();
