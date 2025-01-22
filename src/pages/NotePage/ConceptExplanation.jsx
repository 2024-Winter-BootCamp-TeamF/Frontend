import React from "react";
import styled from "styled-components";
import DownloadButton from "../../components/DownloadButton";
import { conceptData } from "./data/conceptData";

const ConceptExplanation = () => {
  return (
    <Container>
      <RightSection>
        <ConceptsWrapper>
          {conceptData.map((concept, index) => (
            <ConceptContainer key={concept.id} isFirst={index === 0}>
              <ContentWrapper>
                <QuestionNumber>{concept.question}</QuestionNumber>
                {concept.type === "multiple" ? (
                  <OptionsContainer>
                    {concept.options.map((option, idx) => (
                      <OptionItem
                        key={idx}
                        isCorrect={idx === concept.correctAnswer}
                      >
                        {idx + 1}. {option}
                      </OptionItem>
                    ))}
                  </OptionsContainer>
                ) : (
                  <SubjectiveAnswer>
                    정답: {concept.correctAnswer}
                  </SubjectiveAnswer>
                )}
                <ExplanationText>{concept.explanation}</ExplanationText>
              </ContentWrapper>
              <DownloadButtonWrapper>
                <DownloadButton variant="filled" />
              </DownloadButtonWrapper>
            </ConceptContainer>
          ))}
        </ConceptsWrapper>
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 0;

  @media screen and (max-width: 1200px) {
    margin: 0 20px;
  }
`;

const ConceptsWrapper = styled.div`
  margin-right: 80px;

  @media screen and (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const ConceptContainer = styled.div`
  width: 100%;
  min-height: 442px;
  height: auto;
  background-color: #ffffff;
  border: 3px solid #5887f4;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  margin-left: 30px;
  margin-right: 60px;
  margin-top: ${(props) => (props.isFirst ? "100px" : "50px")};
  position: relative;

  @media screen and (max-width: 1200px) {
    margin-left: 0;
    margin-right: 0;
    padding: 15px;
  }
`;

const ContentWrapper = styled.div`
  margin: 40px 0 60px 35px;
  text-align: left;

  @media screen and (max-width: 1200px) {
    margin: 30px 0 60px 20px;
  }
`;

const QuestionNumber = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const OptionItem = styled.div`
  font-size: 18px;
  color: ${(props) => (props.isCorrect ? "#000" : "#333")};
  font-weight: ${(props) => (props.isCorrect ? "700" : "400")};
`;

const ExplanationText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const SubjectiveAnswer = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  margin-bottom: 30px;
`;

const DownloadButtonWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;

export default ConceptExplanation;
