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
      {currentType === "SignUp" && (
        <>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </>
      )}
      <Input
        type="text"
        name="id"
        placeholder="Id"
        value={formData.id}
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
      <SubmitButton
        disabled={!(currentType === "SignUp" ? isSignUpValid : isSignInValid)}
      >
        {currentType === "SignIn" ? "Sign In" : "Sign Up"}
      </SubmitButton>
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
`;

const SubmitButton = styled.button`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#5887f4")};
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#466dc1")};
  }
`;

export default LoginInputForm;
