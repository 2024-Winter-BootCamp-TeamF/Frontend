import styled from "styled-components";

const LoginToggle = ({ currentType, setCurrentType }) => {
  return (
    <ToggleSectionWrapper>
      <TypeButton
        isActive={currentType === "SignIn"}
        onClick={() => setCurrentType("SignIn")}
      >
        SIGN IN
      </TypeButton>
      <TypeButton
        isActive={currentType === "SignUp"}
        onClick={() => setCurrentType("SignUp")}
      >
        SIGN UP
      </TypeButton>
    </ToggleSectionWrapper>
  );
};

const ToggleSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 30px;
`;

const TypeButton = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? "#000" : "#D3D3D3")};
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #004dff" : "none")};
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  padding-bottom: 2px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
`;

export default LoginToggle;
