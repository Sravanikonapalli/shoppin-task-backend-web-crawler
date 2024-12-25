import React, { useState } from "react";
import DomainForm from "./components/DomainForm";
import ResultsDisplay from "./components/ResultsDisplay";
import Loader from "./components/Loader";
import { startCrawler } from "./services/apiService";
import "./styles/App.css";

const App = () => {
  const [domains, setDomains] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStartCrawler = async () => {
    if (domains.length === 0) {
      alert("Please enter at least one domain.");
      return;
    }
    setLoading(true);
    setResults(null);
    try {
      const data = await startCrawler(domains);
      setResults(data);
    } catch (error) {
      alert("Error: Unable to crawl domains. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>E-commerce Product URL Crawler</h1>
      <DomainForm domains={domains} setDomains={setDomains} />
      <button onClick={handleStartCrawler} disabled={loading || domains.length === 0}>
        {loading ? "Crawling..." : "Start Crawler"}
      </button>
      {loading && <Loader />}
      {results && <ResultsDisplay results={results} />}
    </div>
  );
};

export default App;
