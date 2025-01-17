import styled from "styled-components";

const LoginToggle = ({ currentType, setCurrentType }) => {
  return (
    <ToggleSectionWrapper>
      <TypeButton
        isActive={currentType === "SignIn"}
        onClick={() => setCurrentType("SignIn")}
      >
        로그인
      </TypeButton>
      <TypeButton
        isActive={currentType === "SignUp"}
        onClick={() => setCurrentType("SignUp")}
      >
        회원가입
      </TypeButton>
    </ToggleSectionWrapper>
  );
};

const ToggleSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TypeButton = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? "#000" : "#D3D3D3")};
  padding: 8px 0;
  margin: 0 16px;
  cursor: pointer;
  font-family: "HakgyoansimAllimjangTTF-R";
  font-size: 20px;
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  transition: all 0.3s;
  position: relative;
  width: fit-content;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    transform: none;
    width: ${({ isActive }) => (isActive ? "100%" : "0")};
    height: 2px;
    background: #004dff;
    transition: width 0.3s;
  }

  &:hover:after {
    width: 100%;
  }
`;

export default LoginToggle;
