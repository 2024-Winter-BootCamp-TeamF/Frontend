import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import correctIcon from "../../images/correct.png";
import confusedIcon from "../../images/confused.png";

const COLORS = {
  PRIMARY: "#5887f4",
  BACKGROUND: "#ffffff",
};

const SIZES = {
  ICON: "20px",
  TITLE: "24px",
};

const ProblemList = ({ problems }) => {
  return (
    <Container>
      <ProblemListContainer>
        <Title>문제 목록</Title>
        <ProblemUl>
          {problems.map((problem) => (
            <ProblemLi key={problem.id}>
              <ProblemTitle>{problem.title}</ProblemTitle>
              {problem.isDoubleClicked ? (
                <Icon
                  src={confusedIcon}
                  alt="이해가 안 되요"
                  aria-label="이해 안 됨 표시"
                  isVisible={true}
                />
              ) : (
                problem.isSolved && (
                  <Icon
                    src={correctIcon}
                    alt="풀이 완료"
                    aria-label="풀이 완료 표시"
                    isVisible={true}
                  />
                )
              )}
            </ProblemLi>
          ))}
        </ProblemUl>
      </ProblemListContainer>
    </Container>
  );
};

ProblemList.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isSolved: PropTypes.bool,
      isDoubleClicked: PropTypes.bool,
    })
  ).isRequired,
  selectedProblemId: PropTypes.string,
};

const Container = styled.div`
  display: flex;
  margin-top: 150px;
  min-width: 263px;
`;

const ProblemListContainer = styled.div`
  position: fixed;
  top: 200px;
  left: 100px;
  width: 263px;
  height: auto; // 문제 수에 따라 자동 조정
  background-color: ${COLORS.BACKGROUND};
  border: 3px solid ${COLORS.PRIMARY};
  padding: 29px 30px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 300px;
  z-index: 1000;

  @media screen and (max-width: 1200px) {
    left: 50px;
  }

  @media screen and (max-width: 1024px) {
    position: static;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  font-size: ${SIZES.TITLE};
  text-align: center;
  margin-top: 20px;

  margin-bottom: 20px;
`;

const ProblemUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProblemLi = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  margin-bottom: 5px;
  margin-left: 55px;
  border-radius: 4px;
  position: relative;
`;

const ProblemTitle = styled.span`
  font-size: ${SIZES.TITLE};
  text-align: left;
  width: 100%;
`;

const Icon = styled.img`
  width: ${SIZES.ICON};
  height: ${SIZES.ICON};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default ProblemList;
