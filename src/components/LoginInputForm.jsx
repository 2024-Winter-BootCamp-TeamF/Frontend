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
      <InputWrapper>
        <InputGroup>
          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </InputGroup>
        <InputGroup>
          <Label>비밀번호</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={inputValues.password}
            onChange={handleInputChange}
          />
        </InputGroup>
        {currentType === "SignUp" && (
          <InputGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={inputValues.confirmPassword}
              onChange={handleInputChange}
            />
          </InputGroup>
        )}
      </InputWrapper>
      <SubmitButtonWrapper>
        <SubmitButton
          disabled={!(currentType === "SignUp" ? isSignUpValid : isSignInValid)}
        >
          {currentType === "SignIn" ? "로그인하기!" : "회원가입하기!"}
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
  justify-content: space-between;
  gap: 10px;
  padding-top: 3px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-left: 2px;
`;

const Input = styled.input`
  background: #f0f0f0;
  width: 100%;
  height: 50px;
  padding: 12px 15px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 14px;

  &:focus {
    background: #fff;
    border-bottom: 1px solid #004dff; /* 하단 파란색 보더 */
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25); /* 드롭 섀도우 효과 */
  }

  &::placeholder {
    color: #999;
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
`;

const SubmitButton = styled.button`
  width: 150px;
  font-size: 18px;
  color: ${({ disabled }) => (disabled ? "#D3D3D3" : "#fff")};
  background-color: ${({ disabled }) => (disabled ? "#F0F0F0" : "#004DFF")};
  border: 1px solid ${({ disabled }) => (disabled ? "#F0F0F0" : "#004DFF")};
  border-radius: 5px;
  padding: 12px 20px 12px 20px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s, color 0.3s, border 0.3s;
  font-weight: 500;
  font-family: "HakgyoansimAllimjangTTF-R";

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#F0F0F0" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#D3D3D3" : "#004DFF")};
    border: ${({ disabled }) =>
      disabled ? "1px solid #F0F0F0" : "1px solid #004DFF"};
  }

  &:active {
    background-color: ${({ disabled }) =>
      disabled ? "#F0F0F0" : "#004DFF"}; /* 클릭 시 짙은 파란색 */
    color: ${({ disabled }) => (disabled ? "#D3D3D3" : "#fff")};
  }
`;

export default LoginInputForm;
