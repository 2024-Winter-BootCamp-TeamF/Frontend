import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import correctIcon from "../../images/correct.png";
import confusedIcon from "../../images/confused.png";
import wrongIcon from "../../images/wrong.png";

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
                <Icon
                  src={problem.isSolved ? correctIcon : wrongIcon}
                  alt={problem.isSolved ? "풀이 완료" : "오답"}
                  aria-label={problem.isSolved ? "풀이 완료 표시" : "오답 표시"}
                  isVisible={problem.isSolved || problem.isDoubleClicked}
                />
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
  min-width: 200px;
`;

const ProblemListContainer = styled.div`
  position: fixed;
  width: 200px;
  height: auto; // 문제 수에 따라 자동 조정
  background-color: ${COLORS.BACKGROUND};
  border: 3px solid ${COLORS.PRIMARY};
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 20px 0 20px 0;

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
  margin-bottom: 10px;
`;

const ProblemUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ProblemLi = styled.li`
  width: 100px;
  border-radius: 4px;
  position: relative;
  padding: 5px;
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
  left: 80%;
  transform: translateX(-50%);
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export default ProblemList;
