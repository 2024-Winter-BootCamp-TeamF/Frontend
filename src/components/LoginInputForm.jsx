import styled from "styled-components";

const LoginInputForm = ({ currentType, inputValues, setInputValues }) => {
  // 상태 관리

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // 유효성 검사 예시 (비밀번호 일치 여부)
  const isSignUpValid =
    currentType === "SignUp" &&
    inputValues.password &&
    inputValues.password === inputValues.confirmPassword;

  const isSignInValid =
    currentType === "SignIn" && inputValues.name && inputValues.password;

  return (
    <InputFormWrapper>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={inputValues.name}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={inputValues.password}
        onChange={handleInputChange}
      />
      {currentType === "SignUp" && (
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={inputValues.confirmPassword}
          onChange={handleInputChange}
        />
      )}
      <SubmitButtonWrapper>
        <SubmitButton
          disabled={!(currentType === "SignUp" ? isSignUpValid : isSignInValid)}
        >
          {currentType === "SignIn" ? "LOGIN" : "SIGN UP"}
        </SubmitButton>
      </SubmitButtonWrapper>
    </InputFormWrapper>
  );
};

const InputFormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 3px;
`;

const Input = styled.input`
  background: #f0f0f0;
  width: 100%;
  height: auto;
  padding: 10px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 10px;

  &:focus {
    background: #fff;
    border-bottom: 1px solid #004dff; /* 하단 파란색 보더 */
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25); /* 드롭 섀도우 효과 */
  }
`;

const SubmitButtonWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const SubmitButton = styled.button`
  width: 50%;
  font-size: 10px;
  color: ${({ disabled }) => (disabled ? "#D3D3D3" : "#fff")};
  background-color: ${({ disabled }) => (disabled ? "#F0F0F0" : "#004DFF")};
  border: 1px solid ${({ disabled }) => (disabled ? "#F0F0F0" : "#004DFF")};
  border-radius: 5px;
  padding: 8px 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#F0F0F0" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#D3D3D3" : "#004DFF")};
    border: ${({ disabled }) =>
      disabled ? "1px solid #F0F0F0" : "1px solid #004DFF"};
  }

  &:active {
    background-color: ${({ disabled }) =>
      disabled ? "#ccc" : "#004DFF"}; /* 클릭 시 짙은 파란색 */
    color: ${({ disabled }) => (disabled ? "#000" : "#fff")};
  }
`;

export default LoginInputForm;
