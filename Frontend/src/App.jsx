import { useState } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // Highlight.js theme
import hljs from "highlight.js"; // ✅ Import highlight.js
import "./App.css";

// ✅ Default starter code for each language
const defaultSnippets = {
  javascript: `function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3));`,
  python: `def sum(a, b):
    return a + b

print(sum(2, 3))`,
  java: `public class Main {
  public static int sum(int a, int b) {
    return a + b;
  }

  public static void main(String[] args) {
    System.out.println(sum(2, 3));
  }
}`,
  cpp: `#include <iostream>
using namespace std;

int sum(int a, int b) {
    return a + b;
}

int main() {
    cout << sum(2, 3) << endl;
    return 0;
}`,
};

const App = () => {
  const [language, setLanguage] = useState("javascript"); // default lang
  let [code, setCode] = useState(defaultSnippets["javascript"]); // start with JS
  const [disabled, setDisabled] = useState(false);
  const [review, setReview] = useState(``);

  async function reviewCode() {
    setReview("");
    code = code.trim();
    if(code.length === 0)return;
    setDisabled(true);
    try {
      
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
        language,
      });
      console.log(response.data);
      setReview(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setDisabled(false);
  }

  // ✅ When language changes, load default snippet
  function handleLanguageChange(e) {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(defaultSnippets[lang]);
    setReview("")
  }

  return (
    <main>
      <div className="left">
        {/* Language Dropdown */}
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Select Language: </label>
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        {/* Code Editor */}
        <div className="code">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={(code) => {
              try {
                return hljs.highlight(code, { language }).value;
              } catch {
                return hljs.highlightAuto(code).value; // fallback
              }
            }}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              
              borderRadius: "5px",
              
              width: "100%",
              backgroundColor: "#2d2d2d",
              color: "#fff",
            }}
          />
        </div>

        {/* Review Button */}
        <button className="review" disabled={disabled} onClick={reviewCode}>
          Review
        </button>
      </div>

      {/* Review Output */}
      <div className="right" >
      {!review && <span style={{margin:"auto", fontSize:"1.5rem", textAlign:"center"}}>{!disabled? `Want to Review your code!`:`Reviewing your ${language} code...`}</span>}
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
};

export default App;
