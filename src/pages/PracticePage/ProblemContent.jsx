// components/ProblemContent.js
import React from "react";
import MultipleChoice from "./MultipleChoice";
import ShortAnswer from "./Subjective";

const ProblemContent = ({ problems }) => {
  return (
    <div>
      {problems.map((problem) => {
        if (problem.type === "multiple_choice") {
          return <MultipleChoice key={problem.id} problem={problem} />;
        }
        if (problem.type === "short_answer") {
          return <ShortAnswer key={problem.id} problem={problem} />;
        }
        return null;
      })}
    </div>
  );
};

export default ProblemContent;
