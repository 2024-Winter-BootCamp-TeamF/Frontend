import React, { useState } from "react";
import styled from "styled-components";

const LoginInputForm = ({ currentType }) => {
  // 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 유효성 검사 예시 (비밀번호 일치 여부)
  const isSignUpValid =
    currentType === "SignUp" &&
    formData.password &&
    formData.password === formData.confirmPassword;

  const isSignInValid =
    currentType === "SignIn" && formData.id && formData.password;

  return (
    <InputFormWrapper>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {currentType === "SignUp" && (
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
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
  color: ${({ disabled }) => (disabled ? "#000" : "#fff")};
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#004DFF")};
  border: 1px solid #004dff;
  border-radius: 5px;
  padding: 8px 0 8px 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#000" : "#004DFF")};
    border: ${({ disabled }) => (disabled ? "none" : "1px solid #004DFF")};
  }
`;

export default LoginInputForm;
