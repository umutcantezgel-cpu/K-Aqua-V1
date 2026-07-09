import { NextRequest, NextResponse } from 'next/server';
import { ragService } from '@/lib/services/RagService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query as string;

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // 1. Retrieve highly relevant chunks from Pinecone VectorDB
    const context = await ragService.retrieveContext(query);

    // 2. Generate a streamed response using Gemini 1.5 Pro
    const stream = await ragService.generateStream(query, context);

    // 3. Return native Edge response stream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const chunkText = chunk.text();
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
        controller.close();
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API /assistant error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during RAG Generation' },
      { status: 500 }
    );
  }
}
