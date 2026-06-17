"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function summarize() {
    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://text-summarize-ai.onrender.com/summarizer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      const data = await response.json();

      setSummary(data.result);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        AI Text Summarizer
      </h1>

      <textarea
        rows={10}
        className="w-full border rounded-lg p-4"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={summarize}
        disabled={loading}
        className="mt-4 px-6 py-3 border rounded-lg"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div className="mt-8 border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-3">
            Summary
          </h2>

          <p className="whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      )}
    </main>
  );
}