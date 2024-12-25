import React from "react";

const DomainForm = ({ domains, setDomains }) => {
  const handleChange = (e) => {
    setDomains(e.target.value.split("\n"));
  };

  return (
    <div className="domain-form">
      <h3>Enter Domains (one per line):</h3>
      <textarea
        rows="10"
        cols="50"
        placeholder="e.g., example1.com\nexample2.com"
        value={domains.join("\n")}
        onChange={handleChange}
      />
    </div>
  );
};

export default DomainForm;
