import ChatbotWidget from "@/components/Widget/ChatbotWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Roxonn Chatbot Demo</h1>
        <p className="text-xl text-muted-foreground">
          Click the chat bubble in the bottom right to get started.
        </p>
      </div>
      <ChatbotWidget />
    </main>
  );
}
