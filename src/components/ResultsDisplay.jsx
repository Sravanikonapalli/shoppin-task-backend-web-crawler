import React from "react";

const ResultsDisplay = ({ results }) => {
  return (
    <div className="results-display">
      <h3>Crawler Results</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Product URLs</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([domain, urls]) => (
            <tr key={domain}>
              <td>{domain}</td>
              <td>
                <ul>
                  {urls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsDisplay;
